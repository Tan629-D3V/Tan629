import React, { forwardRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const ForceGraph2DWrapper = forwardRef((props, ref) => (
  <ForceGraph2D {...props} ref={ref} />
));

ForceGraph2DWrapper.displayName = 'ForceGraph2DWrapper';

export default ForceGraph2DWrapper; 