export function createConnector(
    fromNode: SceneNode,
    toNode: SceneNode,
    fromRelation: string,
    toRelation: string,
    tableColor: RGB
  ): ConnectorNode {
    const connector = figma.createConnector();
  
    connector.connectorStart = {
      endpointNodeId: fromNode.id,
      magnet: 'LEFT',
    };
    connector.connectorEnd = {
      endpointNodeId: toNode.id,
      magnet: 'LEFT',
    };
    connector.connectorStartStrokeCap =
      fromRelation === '1' ? 'CIRCLE_FILLED' : 'ARROW_LINES';
    connector.connectorEndStrokeCap =
      toRelation === '1' ? 'CIRCLE_FILLED' : 'ARROW_LINES';
    connector.strokeWeight = 2;
    connector.strokes = [{ type: 'SOLID', color: tableColor }];
  
    return connector;
  }

// TODO: Need to make the connector change in the function utils.ts not here...
export function processReferences(
    schema: SchemaResponse,
    msg: any,
    rowNodeMap: Map<string, SceneNode>,
    tableColorMap: Map<string, RGB>,
    allConnectors: ConnectorNode[]
  ) {
    for (const ref of schema.refs ?? []) {
      const fromKey = `${ref.from.schema}.${ref.from.table}.${ref.from.fieldNames[0]}`;
      const toKey = `${ref.to.schema}.${ref.to.table}.${ref.to.fieldNames[0]}`;
  
      const fromRelation = ref.from.relation;
      const toRelation = ref.to.relation;
  
      const fromTableName = `${ref.from.schema}.${ref.from.table}`;
  
      const fromNode = rowNodeMap.get(fromKey);
      const toNode = rowNodeMap.get(toKey);
      const tableName = fromTableName;
      const tableColor = tableColorMap.get(tableName) || { r: 0.1, g: 0.1, b: 0.1 };
  
      if (fromNode && toNode) {
        const connector = createConnector(fromNode, toNode, fromRelation, toRelation, tableColor);
        figma.currentPage.appendChild(connector);
        allConnectors.push(connector);
      }
    }
  }