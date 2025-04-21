import { createLegend, loadFonts, placeWithoutOverlap, createSectionWithNodes } from '../components/utils';
import { processReferences } from '../components/connector';
import { processTables } from '../components/table';

const rowNodeMap = new Map<string, SceneNode>();
const tableColorMap = new Map<string, RGB>();

async function main() {
  // Main UI 
  figma.showUI(__uiFiles__.main, { width: 400, height: 200 });

  // Triggered when the user clicks the "Enter Table" button in the UI
  figma.ui.onmessage = async (msg) => {
    if (msg.type === 'enter-table') {

      // Load Secondary UI
      figma.showUI(__uiFiles__.secondary, { width: 800, height: 600 });
      
      // Message Response to generate tables
      figma.ui.onmessage = async (msg) => {
        if (msg.type === 'response-editor') {
          await loadFonts();

          const data: DBMLResponse = JSON.parse(msg.dbml);
          const allTables: FrameNode[] = [];
          const allConnectors: ConnectorNode[] = [];

          // Iterate through schemas, and process tables, references
          for (const schema of Array.isArray(data.schemas) ? data.schemas : [data.schemas]) {
            if (!schema.tables) continue;
            await processTables(schema, rowNodeMap, tableColorMap, allTables);            
            await processReferences(schema, msg, rowNodeMap, tableColorMap, allConnectors);
          }           

          // Place tables without overlap
          await placeWithoutOverlap(allTables);

          const section = createSectionWithNodes(allTables, allConnectors, data.name ?? 'Untitled Section')
          await createLegend(section.x - 300, section.y);

          figma.viewport.scrollAndZoomIntoView([section]);

          setTimeout(() => {
            figma.ui.postMessage({
              type: 'status',
              message: 'All tables and connectors created inside a section!',
            });
            figma.closePlugin();
          }, 200);
        }
      };
    }
  };
}

main();
