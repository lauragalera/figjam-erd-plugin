/// <reference path="types.d.ts" />



const defaultHeaderColors = {
  apricot: { r: 1.0, g: 0.8, b: 0.6 },
  aquaMist: { r: 0.72, g: 0.93, b: 0.9 },
  babyBlue: { r: 0.7, g: 0.89, b: 1.0 },
  banana: { r: 1.0, g: 1.0, b: 0.6 },
  blueBell: { r: 0.64, g: 0.6, b: 0.81 },
  blushPink: { r: 1.0, g: 0.8, b: 0.86 },
  butter: { r: 1.0, g: 0.96, b: 0.6 },
  cantaloupe: { r: 1.0, g: 0.75, b: 0.5 },
  celadon: { r: 0.72, g: 0.9, b: 0.75 },
  celeste: { r: 0.7, g: 1.0, b: 0.98 },
  champagne: { r: 0.97, g: 0.91, b: 0.81 },
  coralBlush: { r: 1.0, g: 0.75, b: 0.65 },
  cottonCandy: { r: 1.0, g: 0.73, b: 0.85 },
  daffodil: { r: 1.0, g: 0.95, b: 0.4 },
  dandelion: { r: 0.94, g: 0.88, b: 0.4 },
  denimLight: { r: 0.6, g: 0.75, b: 0.95 },
  fairyTale: { r: 0.95, g: 0.75, b: 0.88 },
  flamingo: { r: 0.98, g: 0.55, b: 0.45 },
  frost: { r: 0.78, g: 0.88, b: 0.85 },
  goldenrod: { r: 0.95, g: 0.77, b: 0.3 },
  grapefruit: { r: 1.0, g: 0.58, b: 0.58 },
  guava: { r: 0.97, g: 0.58, b: 0.6 },
  honeydew: { r: 0.8, g: 1.0, b: 0.8 },
  icyMint: { r: 0.75, g: 1.0, b: 0.9 },
  jonquil: { r: 1.0, g: 0.86, b: 0.35 },
  lavenderPink: { r: 0.98, g: 0.68, b: 0.82 },
  lemonChiffon: { r: 1.0, g: 1.0, b: 0.75 },
  lightCoral: { r: 1.0, g: 0.6, b: 0.6 },
  lightCyan: { r: 0.88, g: 1.0, b: 1.0 },
  lightFuchsia: { r: 0.95, g: 0.6, b: 0.9 },
  lightLavender: { r: 0.9, g: 0.8, b: 1.0 },
  lightMoss: { r: 0.7, g: 0.8, b: 0.65 },
  lightPeach: { r: 1.0, g: 0.88, b: 0.7 },
  lightPeriwinkle: { r: 0.8, g: 0.8, b: 1.0 },
  lightRose: { r: 1.0, g: 0.7, b: 0.8 },
  lightSky: { r: 0.7, g: 0.85, b: 1.0 },
  lightSpringGreen: { r: 0.7, g: 1.0, b: 0.8 },
  lightStrawberry: { r: 0.95, g: 0.6, b: 0.6 },
  lilacMist: { r: 0.88, g: 0.75, b: 0.95 },
  limeCream: { r: 0.9, g: 1.0, b: 0.7 },
  mango: { r: 1.0, g: 0.85, b: 0.4 },
  marigold: { r: 1.0, g: 0.85, b: 0.35 },
  mellowGreen: { r: 0.7, g: 0.85, b: 0.6 },
  melon: { r: 1.0, g: 0.7, b: 0.6 },
  oceanMist: { r: 0.6, g: 0.9, b: 0.85 },
  orchidLight: { r: 0.88, g: 0.6, b: 0.88 },
  paleGold: { r: 0.95, g: 0.85, b: 0.5 },
  paleGreen: { r: 0.75, g: 0.95, b: 0.75 },
  palePeach: { r: 1.0, g: 0.85, b: 0.7 },
  palePink: { r: 1.0, g: 0.8, b: 0.9 },
  pastelAqua: { r: 0.7, g: 0.95, b: 0.95 },
  pastelBlue: { r: 0.75, g: 0.85, b: 1.0 },
  pastelCoral: { r: 1.0, g: 0.7, b: 0.6 },
  pastelGreen: { r: 0.7, g: 0.95, b: 0.7 },
  pastelOrange: { r: 1.0, g: 0.8, b: 0.6 },
  pastelPink: { r: 1.0, g: 0.75, b: 0.85 },
  pastelPurple: { r: 0.8, g: 0.7, b: 0.95 },
  pastelRed: { r: 0.98, g: 0.6, b: 0.6 },
  pastelYellow: { r: 1.0, g: 1.0, b: 0.6 },
  peachFuzz: { r: 1.0, g: 0.85, b: 0.65 },
  periwinkle: { r: 0.8, g: 0.8, b: 1.0 },
  pinkLemonade: { r: 1.0, g: 0.78, b: 0.8 },
  pinkPeach: { r: 1.0, g: 0.75, b: 0.7 },
  roseQuartz: { r: 0.95, g: 0.7, b: 0.8 },
  seashell: { r: 1.0, g: 0.96, b: 0.93 },
  softBlue: { r: 0.75, g: 0.85, b: 1.0 },
  softCantaloupe: { r: 1.0, g: 0.8, b: 0.65 },
  softLime: { r: 0.8, g: 1.0, b: 0.6 },
  springBlossom: { r: 0.9, g: 0.85, b: 1.0 },
  strawberryMilk: { r: 1.0, g: 0.8, b: 0.85 },
  sunflower: { r: 1.0, g: 0.9, b: 0.3 },
  tangerineLight: { r: 1.0, g: 0.75, b: 0.4 },
  taffy: { r: 0.95, g: 0.7, b: 0.8 },
  vanilla: { r: 1.0, g: 0.95, b: 0.8 },
  watermelonJuice: { r: 1.0, g: 0.6, b: 0.6 }
};


const theme = {
  borderRadius: 8,
  fontSize: 14,
  fontMonoSize: 13,
  fontNameRegular: { family: "Roboto Mono", style: "Regular" } as FontName,
  fontNameBold: { family: "Roboto Mono", style: "Bold" } as FontName,
  fontDefault: { family: "Inter", style: "Medium" } as FontName,
  spacingX: 100,
  spacingY: 80,
  maxWidth: 1600,

  colors: {
    background: { r: 0.1, g: 0.1, b: 0.1 },
    header: { r: 1.0, g: 0.91, b: 0.6 },
    text: { r: 0.1, g: 0.1, b: 0.1 },
    pk: { r: 1, g: 1, b: 0.8 },
    fk: { r: 0.85, g: 0.85, b: 1 },
    default: { r: 0.97, g: 0.97, b: 0.97 },
  }
};

const rowNodeMap = new Map<string, SceneNode>();
const tableColorMap = new Map<string, RGB>();

async function loadFonts() {
  await figma.loadFontAsync(theme.fontNameRegular);
  await figma.loadFontAsync(theme.fontNameBold);
  await figma.loadFontAsync(theme.fontDefault);
}

async function createTextNode(characters: string, bold = false, fontSize = theme.fontSize) {
  const text = figma.createText();

  text.fontName = bold ? theme.fontNameBold : theme.fontNameRegular;
  text.fontSize = fontSize;
  text.fills = [{ type: "SOLID", color: theme.colors.text }];
  
  text.characters = characters; 

  return text;
}

async function createRow(schemaName: string, tableName: string, column: FieldResponse, totalWidth: number) {
  const row = figma.createFrame();
  row.layoutMode = "HORIZONTAL";
  row.counterAxisSizingMode = "AUTO";
  row.primaryAxisSizingMode = "AUTO";
  row.resize(totalWidth, 100);
  row.itemSpacing = 8;
  row.paddingLeft = 8;
  row.paddingRight = 8;
  row.paddingTop = 4;
  row.paddingBottom = 4;
  row.fills = [{
    type: "SOLID",
    color: column.pk ? theme.colors.pk : column.fk ? theme.colors.fk : theme.colors.default,
  }];
  row.name = `${schemaName}.${tableName}.${column.name}`;

  console.log("Row name:", row.name);

  rowNodeMap.set(row.name, row);

  console.log(rowNodeMap);

  if (column.pk) {
    const keyIcon = await createTextNode("🔑");
    row.appendChild(keyIcon);
  }

  if (column.fk) {
    const foreignKeyIcon = await createTextNode("🔗");
    row.appendChild(foreignKeyIcon);
  }

  const nameText = await createTextNode(column.name, column.pk, theme.fontMonoSize);
  const typeText = await createTextNode(column.type, false, theme.fontMonoSize);
  typeText.opacity = 0.6;

  const typeContainer = figma.createFrame();
  typeContainer.layoutMode = "HORIZONTAL";
  typeContainer.counterAxisSizingMode = "AUTO";
  typeContainer.primaryAxisSizingMode = "AUTO";
  typeContainer.fills = [];
  typeContainer.appendChild(typeText);

  row.appendChild(nameText);
  row.appendChild(typeContainer);

  return row;
}

async function createHeader(headerTitle: string, headerDescription: string, totalWidth: number, colorHeader: RGB) {
  // HEADER FRAME
  const header = figma.createFrame();
  header.layoutMode = "VERTICAL";
  header.primaryAxisSizingMode = "AUTO";
  header.counterAxisSizingMode = "FIXED";
  header.resize(totalWidth, 100); // Set fixed width
  header.primaryAxisAlignItems = "CENTER"; // Center children horizontally
  header.paddingTop = 10;
  header.paddingBottom = 10;
  header.fills = [{ type: "SOLID", color: colorHeader }];

  // TITLE TEXT NODE
  const title = await createTextNode(headerTitle, true);
  title.textAlignHorizontal = "CENTER"; // Center text within its box
  title.layoutAlign = "STRETCH"; // Center text node within parent

  // Add text nodes to header
  header.appendChild(title);

  if(headerDescription !== "") {
    // SUBTITLE TEXT NODE
    const subtitle = await createTextNode(headerDescription, false);
    subtitle.fontSize = 12;
    subtitle.opacity = 0.6;
    subtitle.textAlignHorizontal = "CENTER";
    subtitle.layoutAlign = "STRETCH";

    header.appendChild(subtitle);
  }

  return header;
}

async function createBeautifulTable(schemaData: SchemaResponse, tableData: TableResponse, colorHeader: RGB): Promise<FrameNode> {
  const container = figma.createFrame();
  container.layoutMode = "VERTICAL";
  container.counterAxisSizingMode = "AUTO";
  container.primaryAxisSizingMode = "AUTO";
  container.itemSpacing = 1;
  container.paddingTop = 0;
  container.topLeftRadius = theme.borderRadius;
  container.topRightRadius = theme.borderRadius;
  container.bottomLeftRadius = 0;
  container.bottomRightRadius = 0;
  container.fills = [{ type: "SOLID", color: theme.colors.background }];
  container.name = tableData.name;

  container.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.08 },
    offset: { x: 0, y: 4 },
    radius: 8,
    spread: 0,
    visible: true,
    blendMode: "NORMAL"
  }];

  const headerTable = `${schemaData.name}.${tableData.name}`;	
  const headerDescription = tableData.note ?? "";

  tableColorMap.set(headerTable, colorHeader);


  const maxWidth = calculateMaxWidth(headerTable, tableData);

  const header = await createHeader(headerTable, headerDescription, maxWidth, colorHeader);
  container.appendChild(header);

  for (const column of tableData.fields ?? []) {
    const row = await createRow(schemaData.name, tableData.name, column, maxWidth);
    container.appendChild(row);
  }

  figma.currentPage.appendChild(container);
  container.x = -9999;
  container.y = -9999;

  await new Promise(resolve => setTimeout(resolve, 0));
  return container;
}

function doesOverlap(a: Rect, b: Rect) {
  return !(
    a.x + a.width < b.x ||
    a.x > b.x + b.width ||
    a.y + a.height < b.y ||
    a.y > b.y + b.height
  );
}

async function placeWithoutOverlap(tables: FrameNode[]) {
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
      const overlapping = placedRects.some(rect => doesOverlap(rect, newRect));
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

function estimateTextWidth(text: string, charWidth = 10, padding = 40): number {
  return text.length * charWidth + padding;
}

function calculateMaxWidth(tableHeader: string, tableData: TableResponse): number {
  let maxWidth = 0;

  const tableNameWidth = estimateTextWidth(tableHeader, 10, 40);
  maxWidth = Math.max(maxWidth, tableNameWidth);

  for (const field of tableData.fields ?? []) {
    const fieldWidth = estimateTextWidth(`${field.name} ${field.type}`, 10, 40);
    maxWidth = Math.max(maxWidth, fieldWidth);
  }

  return maxWidth;
}


async function legend(x: number = 0, y: number = 0) {
  const rect = figma.createRectangle();
  rect.resize(200, 70);
  rect.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  rect.name = "Node";
  rect.x = x;
  rect.y = y;
  rect.cornerRadius = theme.borderRadius;
  figma.currentPage.appendChild(rect);

  const title = figma.createText();
  title.characters = "RELATIONSHIP LEGEND";
  title.fontName = theme.fontNameBold;
  title.fontSize = theme.fontSize;
  title.fills = [{ type: "SOLID", color: theme.colors.text }];
  title.x = rect.x + 20;
  title.y = rect.y - 20;
  figma.currentPage.appendChild(title);

   // Create ONE (1) text
   const oneText = figma.createText();
   oneText.characters = "ONE (1)";
   oneText.fontName = theme.fontNameRegular;
   oneText.fontSize = theme.fontSize;
   oneText.fills = [{ type: "SOLID", color: theme.colors.text }];
   oneText.x = rect.x + 20;
   oneText.y = title.y + 30;
   figma.currentPage.appendChild(oneText);
 
   // Create MANY (m) text
   const manyText = figma.createText();
   manyText.characters = "MANY (m)";
   manyText.fontName = theme.fontNameRegular;
   manyText.fontSize = theme.fontSize;
   manyText.fills = [{ type: "SOLID", color: theme.colors.text }];
   manyText.x = rect.x + 20;
   manyText.y = oneText.y + 30;
   figma.currentPage.appendChild(manyText);
 
   // Create arrow for ONE (1)
   const oneConnector = figma.createConnector();
   oneConnector.connectorStart = {
     endpointNodeId: oneText.id,
     magnet: "CENTER",
   };
   oneConnector.connectorEnd = {
     position: { x: oneText.x + 100, y: oneText.y + oneText.height / 2 },
   };
   oneConnector.strokeWeight = 2;
   oneConnector.strokes = [{ type: "SOLID", color: theme.colors.text }];
   oneConnector.connectorStartStrokeCap = "NONE"; 
   oneConnector.connectorEndStrokeCap = "CIRCLE_FILLED";
   oneConnector.connectorLineType = "STRAIGHT";
   figma.currentPage.appendChild(oneConnector);
 
   // Create arrow for MANY (m)
   const manyConnector = figma.createConnector();
   manyConnector.connectorStart = {
     endpointNodeId: manyText.id,
     magnet: "CENTER",
   };
   manyConnector.connectorEnd = {
     position: { x: manyText.x + 100, y: manyText.y + manyText.height / 2 },
   };
   manyConnector.strokeWeight = 2;
   manyConnector.strokes = [{ type: "SOLID", color: theme.colors.text }];
   manyConnector.connectorStartStrokeCap = "NONE"; 
   manyConnector.connectorEndStrokeCap = "ARROW_LINES";
   manyConnector.connectorLineType = "STRAIGHT"; 
   figma.currentPage.appendChild(manyConnector);
 
   figma.group([rect, title, oneText, manyText, oneConnector, manyConnector], figma.currentPage);
  }


async function main() {
  figma.showUI(__uiFiles__.main, { width: 400, height: 200 });

  figma.ui.onmessage = async msg => {
    if (msg.type === 'edit-dbml') {
      figma.showUI(__uiFiles__.secondary, { width: 800, height: 600 });

      figma.ui.onmessage = async msg => {
        if (msg.type === 'text') {
          await loadFonts();

          const data: DBMLResponse = JSON.parse(msg.dbml);
          const allTables: FrameNode[] = [];
          const allConnectors: ConnectorNode[] = [];

          let color = 0;

          console.log("Parsed DBML data:", data);

          for (const schema of Array.isArray(data.schemas) ? data.schemas : [data.schemas]) {
            if (!schema.tables) continue;

            for (const table of schema.tables) {
              const colorHeader = defaultHeaderColors[Object.keys(defaultHeaderColors)[color] as keyof typeof defaultHeaderColors];
              const tableFrame = await createBeautifulTable(schema, table, colorHeader);
              allTables.push(tableFrame);
              color += 1;
              if (color >= Object.keys(defaultHeaderColors).length) {
                color = 0;
              }
            }

            for (const ref of schema.refs ?? []) {
              const fromKey = `${ref.from.schema}.${ref.from.table}.${ref.from.fieldNames[0]}`;
              const toKey = `${ref.to.schema}.${ref.to.table}.${ref.to.fieldNames[0]}`;

              const fromRelation = ref.from.relation;
              const toRelation = ref.to.relation;

              console.log("From relation:", fromRelation);
              console.log("To relation:", toRelation);
              console.log("From key:", fromKey);  
              console.log("To key:", toKey);
              const fromTableName = `${ref.from.schema}.${ref.from.table}`;

              const fromNode = rowNodeMap.get(fromKey);
              const toNode = rowNodeMap.get(toKey);
              const tableColor = tableColorMap.get(fromTableName) || { r: 0.1, g: 0.1, b: 0.1 };

              if (fromNode && toNode) {
                const connector = figma.createConnector();

                connector.connectorStart = {
                  endpointNodeId: fromNode.id,
                  magnet: "LEFT",
                };
                connector.connectorEnd = {
                  endpointNodeId: toNode.id,
                  magnet: "LEFT",
                };
                connector.connectorStartStrokeCap = fromRelation == '1' ? 'CIRCLE_FILLED': 'ARROW_LINES';
                connector.connectorEndStrokeCap = toRelation == '1' ? 'CIRCLE_FILLED': 'ARROW_LINES';
                connector.strokeWeight = 2;
                connector.strokes = [{ type: 'SOLID', color: tableColor }];

                figma.currentPage.appendChild(connector);
                allConnectors.push(connector);
              }
            }
          }

          await placeWithoutOverlap(allTables);

          const MARGIN = 100;

          let minX = Infinity, minY = Infinity;
          let maxX = -Infinity, maxY = -Infinity;

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
          section.name = data.name ?? "Untitled Section";
          section.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
          section.x = minX - MARGIN;  // Position section relative to content
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
            section.appendChild(node); // group them inside the section
          }

          await legend(section.x - 300, section.y);

          figma.viewport.scrollAndZoomIntoView([section]);

          setTimeout(() => {
            figma.ui.postMessage({ type: 'status', message: 'All tables and connectors created inside a section!' });
            figma.closePlugin();
          }, 200);
        }
      };
    }
  };
}

main();