import React, { useEffect, useState } from 'react';
import { PartialBlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';
import { Box, Img } from '@chakra-ui/react';
import FullScreenSection from './FullScreenSection';

interface NotionPageRendererProps {
  pageId: string;
}

const NotionPageRenderer: React.FC<NotionPageRendererProps> = ({ pageId }) => {
  const [pageContent, setPageContent] = useState<PartialBlockObjectResponse[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await fetch(`/api/notion?pageId=${pageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Notion page content');
        }
        const data = await response.json();
        setPageContent(data);
      } catch (err) {
        setError('Failed to fetch Notion page content.');
        console.error(err);
      }
    };

    fetchPageContent();
  }, [pageId]);

  type NotionBlock = {
    id: string;
    type: string;
    has_children?: boolean;
    paragraph?: { rich_text: RichTextItemResponse[] };
    heading_1?: { rich_text: RichTextItemResponse[] };
    heading_2?: { rich_text: RichTextItemResponse[] };
    heading_3?: { rich_text: RichTextItemResponse[] };
    bulleted_list_item?: { rich_text: RichTextItemResponse[] };
    numbered_list_item?: { rich_text: RichTextItemResponse[] };
    to_do?: { rich_text: RichTextItemResponse[]; checked: boolean };
    quote?: { rich_text: RichTextItemResponse[] };
    code?: { rich_text: RichTextItemResponse[] };
    image?: {
      type: 'external' | 'file';
      external?: { url: string };
      file?: { url: string };
    };
    toggle?: {
      rich_text: RichTextItemResponse[];
      children?: NotionBlock[];
    };
    table_row?: {
      cells: RichTextItemResponse[][];
    },
    table?: {
      has_column_header: boolean;
      has_row_header: boolean;
      children?: NotionBlock[];
      rows: {
        cells: RichTextItemResponse[][];
      }[];
    };
    column_list?: {
      children?: NotionBlock[];
    };
    column?: {
      children?: NotionBlock[];
    };
  };

  const renderRichText = (richText: RichTextItemResponse[]) => {
    return richText.map((text) => text.plain_text).join(' ');
  };

  const renderBlock = (block: NotionBlock) => {
    if(block.type === 'table') {
      debugger
    }
    if (!('type' in block)) {
      return <div>Unsupported block structure</div>;
    }

    switch (block.type) {
      case 'paragraph':
        return block.paragraph?.rich_text ?
          <p>{renderRichText(block.paragraph.rich_text)}</p> : null;
      case 'heading_1':
        return block.heading_1?.rich_text ?
          <h1>{renderRichText(block.heading_1.rich_text)}</h1> : null;
      case 'heading_2':
        return block.heading_2?.rich_text ?
          <h2>{renderRichText(block.heading_2.rich_text)}</h2> : null;
      case 'heading_3':
        return block.heading_3?.rich_text ?
          <h3>{renderRichText(block.heading_3.rich_text)}</h3> : null;
      case 'bulleted_list_item':
        return block.bulleted_list_item?.rich_text ?
          <li>{renderRichText(block.bulleted_list_item.rich_text)}</li> : null;
      case 'numbered_list_item':
        return block.numbered_list_item?.rich_text ?
          <li>{renderRichText(block.numbered_list_item.rich_text)}</li> : null;
      case 'to_do':
        return block.to_do ? (
          <div>
            <input type="checkbox" defaultChecked={block.to_do.checked} disabled />
            {renderRichText(block.to_do.rich_text)}
          </div>
        ) : null;
      case 'quote':
        return block.quote?.rich_text ?
          <blockquote>{renderRichText(block.quote.rich_text)}</blockquote> : null;
      case 'code':
        return block.code?.rich_text ? (
          <pre>
            <code>{renderRichText(block.code.rich_text)}</code>
          </pre>
        ) : null;
      case 'image':
        if (!block.image) return null;
        const imageUrl = block.image.type === 'external' && block.image.external?.url ?
          block.image.external.url :
          block.image.file?.url;
        return imageUrl ? <Img src={imageUrl} alt="Notion Image" style={{ maxWidth: '100%' }} /> : null;
      case 'toggle':
        return block.toggle ? (
          <details className="my-2">
            <summary className="cursor-pointer">
              {renderRichText(block.toggle.rich_text)}
            </summary>
            <div className="pl-4">
              {block.toggle.children?.map((child, index) => (
                <div key={index}>{renderBlock(child)}</div>
              ))}
            </div>
          </details>
        ) : null;
      case 'table':
        return block.table ? (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody>
                {block.table.children?.map((row, rowIndex) => (
                  <tr key={rowIndex} >
                    {row.table_row?.cells.map((cell, cellIndex) => {
                      const Tag = rowIndex === 0 && block.table?.has_column_header ? 'th' : 'td';
                      return (
                        <Tag
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm"
                        >
                          {renderRichText(cell)}
                        </Tag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null;
      case 'column_list':
        return block.column_list ? (
          <div className="flex flex-wrap gap-4">
            {block.column_list.children?.map((column, index) => (
              <div key={index} className="flex-1 min-w-[250px]">
                {column.column?.children?.map((child, childIndex) => (
                  <div key={childIndex}>{renderBlock(child)}</div>
                ))}
              </div>
            ))}
          </div>
        ) : null;
      case 'column':
        return block.column ? (
          <div className="flex-1">
            {block.column.children?.map((child, index) => (
              <div key={index}>{renderBlock(child)}</div>
            ))}
          </div>
        ) : null;
      default:
        return <div>Unsupported block type: {block.type as string}</div>;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#2A4365"
      position="relative"
      w="100vw"
      flexDirection="column"
    >
      <Box>
        {Array.isArray(pageContent) &&
          pageContent.map((block) => {
            // Only render blocks that have a type property
            if ('type' in block) {
              return <div key={block.id}>{renderBlock(block as unknown as NotionBlock)}</div>;
            }
            return null;
          })}
      </Box>
    </FullScreenSection>
  );
};

export default NotionPageRenderer;
