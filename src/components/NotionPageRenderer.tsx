import React, { useEffect, useState } from 'react';
import { BlockObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
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
        return <h1>{block.heading_1.rich_text.map((text) => text.plain_text).join(' ')}</h1>;
      case 'heading_2':
        return <h2>{block.heading_2.rich_text.map((text) => text.plain_text).join(' ')}</h2>;
      case 'heading_3':
        return <h3>{block.heading_3.rich_text.map((text) => text.plain_text).join(' ')}</h3>;
      case 'bulleted_list_item':
        return <li>{block.bulleted_list_item.rich_text.map((text) => text.plain_text).join(' ')}</li>;
      case 'numbered_list_item':
        return <li>{block.numbered_list_item.rich_text.map((text) => text.plain_text).join(' ')}</li>;
      case 'to_do':
        return (
          <div>
            <input type="checkbox" defaultChecked={block.to_do.checked} disabled />
            {block.to_do.rich_text.map((text) => text.plain_text).join(' ')}
          </div>
        );
      case 'quote':
        return <blockquote>{block.quote.rich_text.map((text) => text.plain_text).join(' ')}</blockquote>;
      case 'code':
        return (
          <pre>
            <code>{block.code.rich_text.map((text) => text.plain_text).join(' ')}</code>
          </pre>
        );
      case 'image':
        const imageUrl = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
        return <Img src={imageUrl} alt="Notion Image" style={{ maxWidth: '100%' }} />;
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
    <FullScreenSection
      isDarkBackground
      backgroundColor="#2A4365"
      position="relative"
      w="100vw"
      flexDirection="column"
    >
      <Box>
        {Array.isArray(pageContent) &&
          pageContent.map((block: BlockObjectResponse | PartialBlockObjectResponse) => (
            <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default NotionPageRenderer;
