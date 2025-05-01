import { theme } from './themes';
import { createTextNode, calculateMaxWidth } from './utils';
import { defaultHeaderColors } from './themes';

async function createRowFigjam(
  rowNodeMap: Map<string, SceneNode>,
  schemaName: string,
  tableName: string,
  column: FieldResponse,
  totalWidth: number,
): Promise<GroupNode> {
  const rowName = `${schemaName}.${tableName}.${column.name}`;

  // RECTANGLE
  const fillColor = column.pk
    ? theme.colors.pk
    : column.fk
      ? theme.colors.fk
      : theme.colors.default;
  const rectangle = figma.createShapeWithText();
  rectangle.shapeType = 'SQUARE';
  rectangle.text.characters = '';
  rectangle.fills = [{ type: 'SOLID', color: fillColor }];
  rectangle.resize(totalWidth, 30);
  rectangle.strokeWeight = 2;
  rectangle.strokes = [{ type: 'SOLID', color: theme.colors.stroke }];

  const children: SceneNode[] = [rectangle];

  let startX = 12;
  // ICONS
  const iconString = `${column.pk ? '🔑' : ''}${column.fk ? '🔗' : ''}`;
  if (iconString) {
    const iconsText = await createTextNode(iconString);
    iconsText.x = startX;
    iconsText.y = 6;
    children.push(iconsText);
    startX += iconsText.width + 12; // Add some spacing after the icons
  }

  // COLUMN NAME & TYPE
  const nameText = await createTextNode(column.name, column.pk, theme.fontMonoSize);
  nameText.x = startX;
  nameText.y = 6;
  children.push(nameText);

  const typeText = await createTextNode(column.type, false, theme.fontMonoSize);
  typeText.opacity = 0.6;
  typeText.x = nameText.x + nameText.width + 12;
  typeText.y = 6;
  children.push(typeText);

  // NOT NULL (optional)
  if (column.not_null) {
    const nullText = await createTextNode('not_null', false, theme.fontMonoSize);
    nullText.opacity = 0.6;
    nullText.x = typeText.x + typeText.width + 12;
    nullText.y = 6;
    children.push(nullText);
  }

  const group = figma.group(children, figma.currentPage);
  rowNodeMap.set(rowName, group);

  return group;
}

async function createRow(
  rowNodeMap: Map<string, SceneNode>,
  schemaName: string,
  tableName: string,
  column: FieldResponse,
  totalWidth: number,
) {
  const row = figma.createFrame();
  row.layoutMode = 'HORIZONTAL';
  row.counterAxisSizingMode = 'AUTO';
  row.primaryAxisSizingMode = 'AUTO';
  row.resize(totalWidth, 100);
  row.itemSpacing = 8;
  row.paddingLeft = 8;
  row.paddingRight = 8;
  row.paddingTop = 4;
  row.paddingBottom = 4;
  row.fills = [
    {
      type: 'SOLID',
      color: column.pk ? theme.colors.pk : column.fk ? theme.colors.fk : theme.colors.default,
    },
  ];
  row.name = `${schemaName}.${tableName}.${column.name}`;

  console.log('Creating Row name:', row.name);

  rowNodeMap.set(row.name, row);

  if (column.pk) {
    const keyIcon = await createTextNode('🔑');
    row.appendChild(keyIcon);
  }

  if (column.fk) {
    const foreignKeyIcon = await createTextNode('🔗');
    row.appendChild(foreignKeyIcon);
  }

  const nameText = await createTextNode(column.name, column.pk, theme.fontMonoSize);
  const typeText = await createTextNode(column.type, false, theme.fontMonoSize);
  typeText.opacity = 0.6;

  const typeContainer = figma.createFrame();
  typeContainer.layoutMode = 'HORIZONTAL';
  typeContainer.counterAxisSizingMode = 'AUTO';
  typeContainer.primaryAxisSizingMode = 'AUTO';
  typeContainer.fills = [];
  typeContainer.appendChild(typeText);

  row.appendChild(nameText);
  row.appendChild(typeContainer);

  if (column.not_null) {
    const nullText = await createTextNode('not_null', false, theme.fontMonoSize);
    nullText.opacity = 0.6;

    const nullContainer = figma.createFrame();
    nullContainer.layoutMode = 'HORIZONTAL';
    nullContainer.counterAxisSizingMode = 'AUTO';
    nullContainer.primaryAxisSizingMode = 'AUTO';
    nullContainer.fills = [];
    nullContainer.appendChild(nullText);
    row.appendChild(nullContainer);
  }

  return row;
}

async function createHeaderFigjam(
  headerTitle: string,
  totalWidth: number,
  colorHeader: RGB,
): Promise<GroupNode> {
  // HEADER FRAME

  // RECTANGLE
  const header = figma.createShapeWithText();
  header.shapeType = 'SQUARE';
  header.text.characters = '';
  header.fills = [{ type: 'SOLID', color: colorHeader }];
  header.resize(totalWidth, 50);
  header.strokeWeight = 2;
  header.strokes = [{ type: 'SOLID', color: theme.colors.stroke }];

  // TITLE TEXT NODE
  header.text.characters = headerTitle;
  header.text.fontName = theme.fontNameBold;
  header.text.fontSize = theme.fontSize;

  header.text.lineHeight = { value: 28, unit: 'PIXELS' };

  const children: SceneNode[] = [header];

  const group = figma.group(children, figma.currentPage);
  return group;
}

async function createBeautifulTableFigjam(
  schemaData: SchemaResponse,
  tableData: TableResponse,
  colorHeader: RGB,
  tableColorMap: Map<string, RGB>,
  rowNodeMap: Map<string, SceneNode>,
): Promise<GroupNode> {
  const headerTable = `${schemaData.name}.${tableData.name}`;
  tableColorMap.set(headerTable, colorHeader);

  const maxWidth = calculateMaxWidth(headerTable, tableData);

  // Starting position
  let currentY = 0;
  const allNodes: SceneNode[] = [];

  // HEADER
  const header = await createHeaderFigjam(headerTable, maxWidth, colorHeader);
  header.x = 0;
  header.y = currentY;
  currentY += header.height;
  allNodes.push(header);

  // ROWS
  for (const column of tableData.fields ?? []) {
    const row = await createRowFigjam(
      rowNodeMap,
      schemaData.name,
      tableData.name,
      column,
      maxWidth,
    );
    row.x = 0;
    row.y = currentY;
    currentY += row.height;
    allNodes.push(row);
  }

  // GROUP all nodes together
  const group = figma.group(allNodes, figma.currentPage);
  group.name = headerTable;

  // Move group off-screen initially
  group.x = -9999;
  group.y = -9999;

  await new Promise((resolve) => setTimeout(resolve, 0));
  return group;
}

async function createHeader(
  headerTitle: string,
  headerDescription: string,
  totalWidth: number,
  colorHeader: RGB,
) {
  // HEADER FRAME
  const header = figma.createFrame();
  header.layoutMode = 'VERTICAL';
  header.primaryAxisSizingMode = 'AUTO';
  header.counterAxisSizingMode = 'FIXED';
  header.resize(totalWidth, 100); // Set fixed width
  header.primaryAxisAlignItems = 'CENTER'; // Center children horizontally
  header.paddingTop = 10;
  header.paddingBottom = 10;
  header.fills = [{ type: 'SOLID', color: colorHeader }];

  // TITLE TEXT NODE
  const title = await createTextNode(headerTitle, true);
  title.textAlignHorizontal = 'CENTER'; // Center text within its box
  title.layoutAlign = 'STRETCH'; // Center text node within parent

  console.log('Creating Header name:', headerTitle);

  // Add text nodes to header
  header.appendChild(title);

  if (headerDescription !== '') {
    // SUBTITLE TEXT NODE
    const subtitle = await createTextNode(headerDescription, false);
    subtitle.fontSize = 12;
    subtitle.opacity = 0.6;
    subtitle.textAlignHorizontal = 'CENTER';
    subtitle.layoutAlign = 'STRETCH';

    header.appendChild(subtitle);
  }

  return header;
}

export async function createBeautifulTable(
  schemaData: SchemaResponse,
  tableData: TableResponse,
  colorHeader: RGB,
  tableColorMap: Map<string, RGB>,
  rowNodeMap: Map<string, SceneNode>,
): Promise<FrameNode> {
  const container = figma.createFrame();
  container.layoutMode = 'VERTICAL';
  container.counterAxisSizingMode = 'AUTO';
  container.primaryAxisSizingMode = 'AUTO';
  container.itemSpacing = 1;
  container.paddingTop = 0;
  container.topLeftRadius = theme.borderRadius;
  container.topRightRadius = theme.borderRadius;
  container.bottomLeftRadius = 0;
  container.bottomRightRadius = 0;
  container.fills = [{ type: 'SOLID', color: theme.colors.background }];
  container.name = tableData.name;

  container.effects = [
    {
      type: 'DROP_SHADOW',
      color: { r: 0, g: 0, b: 0, a: 0.08 },
      offset: { x: 0, y: 4 },
      radius: 8,
      spread: 0,
      visible: true,
      blendMode: 'NORMAL',
    },
  ];

  const headerTable = `${schemaData.name}.${tableData.name}`;
  const headerDescription = tableData.note ?? '';

  tableColorMap.set(headerTable, colorHeader);

  const maxWidth = calculateMaxWidth(headerTable, tableData);

  const header = await createHeader(headerTable, headerDescription, maxWidth, colorHeader);
  container.appendChild(header);

  for (const column of tableData.fields ?? []) {
    const row = await createRowFigjam(
      rowNodeMap,
      schemaData.name,
      tableData.name,
      column,
      maxWidth,
    );
    container.appendChild(row);
  }

  figma.currentPage.appendChild(container);
  container.x = -9999;
  container.y = -9999;

  await new Promise((resolve) => setTimeout(resolve, 0));
  return container;
}

export async function processTables(
  schema: SchemaResponse,
  rowNodeMap: Map<string, SceneNode>,
  tableColorMap: Map<string, RGB>,
  allTables: GroupNode[],
) {
  let color = Math.floor(Math.random() * Object.keys(defaultHeaderColors).length); // Initialize color index randomly

  for (const table of schema.tables ?? []) {
    const colorHeader =
      defaultHeaderColors[
        Object.keys(defaultHeaderColors)[color] as keyof typeof defaultHeaderColors
      ];
    const tableFrame = await createBeautifulTableFigjam(
      schema,
      table,
      colorHeader,
      tableColorMap,
      rowNodeMap,
    );
    allTables.push(tableFrame);
    color += 1;
    color = (color + 1) % Object.keys(defaultHeaderColors).length;
  }
}
