import { theme } from './themes';

function estimateTextWidth(
  text: string,
  offsetNull: boolean,
  charWidth = 10,
  padding = 40,
): number {
  return text.length * charWidth + padding + (offsetNull ? 50 : 0);
}

export function calculateMaxWidth(tableHeader: string, tableData: TableResponse): number {
  let maxWidth = 0;

  const tableNameWidth = estimateTextWidth(tableHeader, false);
  maxWidth = Math.max(maxWidth, tableNameWidth);

  console.log('Table name:', tableHeader);
  for (const field of tableData.fields ?? []) {
    const fieldWidth = estimateTextWidth(`${field.name} ${field.type}`, field.not_null ?? false);
    maxWidth = Math.max(maxWidth, fieldWidth);
  }

  console.log('Max width for table:', maxWidth);

  return maxWidth;
}

export async function loadFonts() {
  await figma.loadFontAsync(theme.fontNameRegular);
  await figma.loadFontAsync(theme.fontNameBold);
  await figma.loadFontAsync(theme.fontDefault);
}

export function createSectionWithNodes(
  allTables: FrameNode[],
  allConnectors: ConnectorNode[],
  sectionName: string,
): SectionNode {

  const MARGIN = 100;

  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  const allNodes = [...allTables, ...allConnectors];

  for (const node of allNodes) {
    const { x, y, width, height } = node;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  }

  const sectionWidth = maxX - minX + MARGIN * 2;
  const sectionHeight = maxY - minY + MARGIN * 2;

  const section = figma.createSection();
  section.name = sectionName ?? 'Untitled Section';
  section.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
  section.x = minX - MARGIN; // Position section relative to content
  section.y = minY - MARGIN;
  section.resizeWithoutConstraints(sectionWidth, sectionHeight);

  for (const node of allTables) {
    // Reposition each node relative to the section
    const adjustedX = node.x - minX + MARGIN;
    const adjustedY = node.y - minY + MARGIN;

    node.x = adjustedX;
    node.y = adjustedY;

    section.appendChild(node); // Append the node inside the section
  }

  for (const node of allConnectors) {
    section.appendChild(node); // Group them inside the section
  }

  return section;
}

export async function createTextNode(characters: string, bold = false, fontSize = theme.fontSize) {
  const text = figma.createText();

  text.fontName = bold ? theme.fontNameBold : theme.fontNameRegular;
  text.fontSize = fontSize;
  text.fills = [{ type: 'SOLID', color: theme.colors.text }];

  text.characters = characters;

  return text;
}

function doesOverlap(a: Rect, b: Rect) {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}

export async function placeWithoutOverlap(tables: FrameNode[]) {
  const spacing = theme.spacingX;
  const step = spacing;
  let x = 0;
  let y = 0;
  let maxHeightInRow = 0;
  const placedRects: Rect[] = [];

  for (const table of tables) {
    const width = table.width;
    const height = table.height;
    let found = false;
    let tryX = x;
    let tryY = y;

    while (!found) {
      const newRect = { x: tryX, y: tryY, width, height };
      const overlapping = placedRects.some((rect) => doesOverlap(rect, newRect));
      if (!overlapping) {
        table.x = tryX;
        table.y = tryY;
        placedRects.push(newRect);
        found = true;

        tryX += width + spacing;
        maxHeightInRow = Math.max(maxHeightInRow, height);

        if (tryX > theme.maxWidth) {
          tryX = 0;
          tryY += maxHeightInRow + theme.spacingY;
          maxHeightInRow = 0;
        }

        x = tryX;
        y = tryY;
      } else {
        tryX += step;
        if (tryX > theme.maxWidth) {
          tryX = 0;
          tryY += step;
        }
      }
    }
  }
}

export async function createLegend(x: number = 0, y: number = 0) {
  const rect = figma.createRectangle();
  rect.resize(200, 70);
  rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  rect.name = 'Node';
  rect.x = x;
  rect.y = y;
  rect.cornerRadius = theme.borderRadius;
  figma.currentPage.appendChild(rect);

  const title = figma.createText();
  title.characters = 'RELATIONSHIP LEGEND';
  title.fontName = theme.fontNameBold;
  title.fontSize = theme.fontSize;
  title.fills = [{ type: 'SOLID', color: theme.colors.text }];
  title.x = rect.x + 20;
  title.y = rect.y - 20;
  figma.currentPage.appendChild(title);

  // Create ONE (1) text
  const oneText = figma.createText();
  oneText.characters = 'ONE  (1)';
  oneText.fontName = theme.fontNameRegular;
  oneText.fontSize = theme.fontSize;
  oneText.fills = [{ type: 'SOLID', color: theme.colors.text }];
  oneText.x = rect.x + 20;
  oneText.y = title.y + 30;
  figma.currentPage.appendChild(oneText);

  // Create MANY (m) text
  const manyText = figma.createText();
  manyText.characters = 'MANY (m)';
  manyText.fontName = theme.fontNameRegular;
  manyText.fontSize = theme.fontSize;
  manyText.fills = [{ type: 'SOLID', color: theme.colors.text }];
  manyText.x = rect.x + 20;
  manyText.y = oneText.y + 30;
  figma.currentPage.appendChild(manyText);

  // Create arrow for ONE (1)
  const oneConnector = figma.createConnector();
  oneConnector.connectorStart = {
    endpointNodeId: oneText.id,
    magnet: 'RIGHT',
  };
  oneConnector.connectorEnd = {
    position: { x: oneText.x + 100, y: oneText.y + oneText.height / 2 },
  };
  oneConnector.strokeWeight = 2;
  oneConnector.strokes = [{ type: 'SOLID', color: theme.colors.text }];
  oneConnector.connectorStartStrokeCap = 'NONE';
  oneConnector.connectorEndStrokeCap = 'CIRCLE_FILLED';
  oneConnector.connectorLineType = 'STRAIGHT';
  figma.currentPage.appendChild(oneConnector);

  // Create arrow for MANY (m)
  const manyConnector = figma.createConnector();
  manyConnector.connectorStart = {
    endpointNodeId: manyText.id,
    magnet: 'RIGHT',
  };
  manyConnector.connectorEnd = {
    position: { x: manyText.x + 100, y: manyText.y + manyText.height / 2 },
  };
  manyConnector.strokeWeight = 2;
  manyConnector.strokes = [{ type: 'SOLID', color: theme.colors.text }];
  manyConnector.connectorStartStrokeCap = 'NONE';
  manyConnector.connectorEndStrokeCap = 'ARROW_LINES';
  manyConnector.connectorLineType = 'STRAIGHT';
  figma.currentPage.appendChild(manyConnector);

  figma.group([rect, title, oneText, manyText, oneConnector, manyConnector], figma.currentPage);
}
