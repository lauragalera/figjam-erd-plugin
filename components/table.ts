import { theme } from './themes';
import { createTextNode, calculateMaxWidth } from './utils';
import { defaultHeaderColors } from './themes';


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
      const row = await createRow(rowNodeMap, schemaData.name, tableData.name, column, maxWidth);
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
    allTables: FrameNode[],
  ) {

    let color = Math.floor(Math.random() * Object.keys(defaultHeaderColors).length); // Initialize color index randomly

    for (const table of schema.tables ?? []) {
        const colorHeader =
          defaultHeaderColors[
            Object.keys(defaultHeaderColors)[color] as keyof typeof defaultHeaderColors
          ];
        const tableFrame = await createBeautifulTable(schema, table, colorHeader, tableColorMap, rowNodeMap);
        allTables.push(tableFrame);
        color += 1;
        if (color >= Object.keys(defaultHeaderColors).length) {
          color = 0;
        }
      }
    }