import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

type BlockContent = {
  children?: BlockObjectResponse[];
  rich_text?: RichTextItemResponse[];
  color?: string;
};

type NotionBlockWithChildren = BlockObjectResponse & {
  type: 'toggle' | 'column_list' | 'column';
  [key: string]: BlockContent | string | boolean | undefined;
};

async function getBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const response = await notion.blocks.children.list({ block_id: blockId });
  const blocks = response.results as BlockObjectResponse[];

  // Recursively fetch children for toggle blocks and column lists
  const enrichedBlocks = await Promise.all(
    blocks.map(async (block: BlockObjectResponse) => {
      if (block.has_children && (block.type === 'toggle' || block.type === 'column_list' || block.type === 'column' || block.type === 'table')) {
        const children = await getBlockChildren(block.id);
        const blockWithType = block as NotionBlockWithChildren;
        const existingContent = (blockWithType[blockWithType.type] as BlockContent) || {};
        blockWithType[blockWithType.type] = {
          ...existingContent,
          children
        };
      }
      return block;
    })
  );

  return enrichedBlocks;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pageId } = req.query;

  if (!pageId || typeof pageId !== 'string') {
    return res.status(400).json({ error: 'Page ID is required' });
  }

  try {
    const blocks = await getBlockChildren(pageId);
    res.status(200).json(blocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Notion page content' });
  }
}
