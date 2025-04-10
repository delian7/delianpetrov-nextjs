import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pageId } = req.query;

  if (!pageId || typeof pageId !== 'string') {
    return res.status(400).json({ error: 'Page ID is required' });
  }

  try {
    const response = await notion.blocks.children.list({ block_id: pageId });
    res.status(200).json(response.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Notion page content' });
  }
}
