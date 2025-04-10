import React, { useEffect, useState } from 'react';
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
        console.log(data);
        setPageContent(data);
      } catch (err) {
        setError('Failed to fetch Notion page content.');
        console.error(err);
      }
    };

    fetchPageContent();
  }, [pageId]);

  const renderBlock = (block: BlockObjectResponse | PartialBlockObjectResponse) => {
    if ('type' in block) {
      switch (block.type) {
      case 'paragraph':
        return <p>{block.paragraph.rich_text.map((text: { plain_text: string }) => text.plain_text).join(' ')}</p>;
      case 'heading_1':
        return <h1>{block.heading_1.rich_text.map((text: {  plain_text: string }) => text.plain_text).join(' ')}</h1>;
      case 'heading_2':
        return <h2>{block.heading_2.rich_text.map((text: {  plain_text: string }) => text.plain_text).join(' ')}</h2>;
      case 'heading_3':
        return <h3>{block.heading_3.rich_text.map((text: {  plain_text: string }) => text.plain_text).join(' ')}</h3>;
      case 'bulleted_list_item':
        return <li>{block.bulleted_list_item.rich_text.map((text: {  plain_text: string }) => text.plain_text).join(' ')}</li>;
      case 'numbered_list_item':
        return <li>{block.numbered_list_item.rich_text.map((text: { plain_text: string }) => text.plain_text).join(' ')}</li>;
      default:
        return <div>Unsupported block type: {block.type}</div>;
      }
    } else {
      return <div>Unsupported block structure</div>;
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pageContent) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {Array.isArray(pageContent) &&
        pageContent.map((block: BlockObjectResponse | PartialBlockObjectResponse) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
    </div>
  );
};

export default NotionPageRenderer;
