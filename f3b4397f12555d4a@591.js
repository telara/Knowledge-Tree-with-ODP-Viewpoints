function _1(md){return(
md`# Navigable, Nested Tree: <br/> Science Viewpoint: Interview Product V2

The [tree](https://github.com/d3/d3-hierarchy/blob/master/README.md#tree) layout produces tidy node-link diagrams of trees using the [Reingold–Tilford “tidy” algorithm](http://reingold.co/tidier-drawings.pdf), improved to run in linear time by [Buchheim et al](http://dirk.jivas.de/papers/buchheim02improving.pdf).`
)}

function _2(md){return(
md`### Instructions for use: 
* Click any __Link__ to make its source node the _root of the layout_ & click again to go back.
* Click any __Label__ to _expand_ their branch or click again to _collapse_ it.
* Click any __Concept label__ to _follow its source URL_.
* Hover over the __Concept label__ to _read its full Description_.

### Features:
* Drill down, so you can follow the same path while going up or down.
* Layout sizing properties are dynamic.
* Gradient paths

### Understanding:
The tree is read **from** most **generic** classification to most **specific.** Hence, it commences with the Viewpoint, followed by the Categories and finally the term and it's Description (when you hover the mouse over the term). If you click on the term, you will be redirected to the source of its description. the Viewpoints and their Categories / Classes are explained below.
`
)}

function _3(md){return(
md`
## Reference Model Explained
## Viewpoints
**Science Viewpoint:** This viewpoint emphasizes the institutional and social context of the system's operational domain. It focuses on the objectives, processes, assets, and policies crucial for the system, addressing the needs of research groups, managers, and sponsors involved in a research project. It spans a wide range of operational settings, from single experiments to large consortia. The main concepts include communities, roles, actions, and artefacts, facilitating a high-level representation of data processes understandable by all stakeholders involved in the research infrastructure.

**Engineer Viewpoint:**
This viewpoint addresses the distribution of components across hardware and software systems, tackling diversity in infrastructure provision and avoiding lock-in to specific platforms. It offers solutions for abstract computational interactions in various situations and provides standard middleware or web services components to simplify engineering specifications. Engineering objects, containers, and channels are the main concepts, focusing on the deployment and communication between subsystems and ensuring the system meets infrastructure needs efficiently.

**Technology Viewpoint:**
The Technology Viewpoint deals with real-world constraints such as hardware limitations and existing platforms, focusing on the implementation aspects of the system. It guides the selection of standards and the configuration of resources, representing the hardware, software, and communication technologies involved. This viewpoint is crucial for managing testing conformance to specifications and includes conformance points and standards as main concepts, detailing the implementation constraints and system requirements.

**Computational Viewpoint:**
Focusing on the design of processes and applications supporting research activities, the Computational Viewpoint models functional units for data processing. It encapsulates objects interacting through typed interfaces, referencing the Information Viewpoint for data objects and their behaviors. The viewpoint utilizes computing objects, interfaces, and configurations to detail the integration of objects providing services, highlighting the high-level design of computational processes.

**Information Viewpoint:**	
The Information Viewpoint offers a clear representation of data assets within the research infrastructure, emphasizing the modeling of data and its manipulation. It aims to establish a common model for design activity across possibly federated and independently developed systems, including the integration of legacy systems. This viewpoint uses information objects and activities to detail the science viewpoint's high-level artefacts, ensuring consistent data interpretation and minimizing information discrepancies across design, development, and implementation phases.

## Classes
**Artifact:** An artifact is an object that can be used as input or output. These range from available technology to established processes and methods, such as ecological processes or identified phenomenon.

**Role:** A role refers to an individual who has set responsibilities. It can also refer to a group of people who have a set purpose. Essentially, any entity with agency.

**Community:** The community is a collection of Roles. This includes established networks of people, such as Research Groups or people who belong to a discipline, such as theoretical biology, or a paradigm. You can refer to yourself as a member of a community when writing user stories. 

**Behaviour:** Behaviour performs an action, which is the state, or process, of doing in order to accomplish something. The behaviour is reliant on a Role, someone to execute the behaviour, and assets, something to execute the behaviour / action on.
`
)}

function _4(md){return(
md`# Interview
- Write at least five user stories with the aid of this reference model. Take a maximum of five minutes to do this.
- Use the tree (or Excel table directly) to understand certain concepts.
- User stories are written as follows:

   \`I, as a <Role> want to use <Asset> to create <Artifact> for the purpose of...\`
 - The **purpose** is created by the user from the other __Classes__ in the Reference Model
 - If you don't find a Role, Asset, or Artifact when you look for it, feel free to use your own language.

The definitions of the intermediary Classes are as follows:
`
)}

function _chart(d3,DOM,width,height)
{

  return d3.select(DOM.svg(width, height)).node();
  
}


function _6(md){return(
md`#### Appendix`
)}

function _draw(d3,chart,WeightedTree,width,height,dataset,valueField)
{
  // clear
  d3.select(chart).html('');
  
  var tree = WeightedTree()
  .svg(chart)
  .width(width)
  .height(height)
  .dataset(dataset)
  .fnValueField(function(d){
    return d[valueField];
  });
  tree();
}


function _width(height){return(
height * 3
)}

function _height(){return(
2000
)}

function _css(html){return(
html`<style>
svg {
    margin: 0;
    padding: 0;
    font-size: 12px;
    font-family: sans-serif;
}

text {
    text-shadow: #fdd 1px 0 6px;
    user-select: none;
}

.weighted-tree .node {
    cursor: pointer;
}

.weighted-tree .node circle {
    fill: #fff;
}

.weighted-tree .link {
    fill: none;
    stroke-linecap: round;
    stroke-opacity: 0.8;
    cursor: pointer;
    stroke-width: 4;
}

.weighted-tree .link:hover {
    stroke-opacity: 0.6;
}
</style>`
)}

function _createHierarchy(){return(
function createHierarchy(data) {
  var root = { key: "", depth: 0, iDepth: 0, values: [] };
  var count = 0;

  data.forEach(function(item) {
    if (!item.Viewpoint || !item.Category || !item.Concept) return;

    var viewpointNode = root.values.find(function(child) { return child.key === item.Viewpoint; });
    if (!viewpointNode) {
      viewpointNode = { key: item.Viewpoint, depth: 1, iDepth: 1, uid: (1 * count++), values: [] };
      root.values.push(viewpointNode);
    }

    var categoryNode = viewpointNode.values.find(function(child) { return child.key === item.Category; });
    if (!categoryNode) {
      categoryNode = { key: item.Category, depth: 2, iDepth: 2, uid: (2 * count++), values: [] };
      viewpointNode.values.push(categoryNode);
    }

    var conceptNode = categoryNode.values.find(function(child) { return child.key === item.Concept; });
    if (!conceptNode) {
      var firstURL = item.URL.split(',')[0].trim();
      conceptNode = { 
        key: item.Concept + ':', 
        Description: item.Description,
        URL: firstURL,
        depth: 4, 
        iDepth: 4, 
        uid: (4 * count++), 
        values: []
      };
      categoryNode.values.push(conceptNode);
    }

    if (!conceptNode.values) {
      conceptNode.values = [];
    }

  });

  return root;
}
)}

function _WeightedTree(d3,aColors,getValueField){return(
function WeightedTree() {

  /*
  Todo: make uid actually unique.           DONE
  Todo: null exception for fnChildren       DONE
  Todo: on click, follow url                DONE
  Todo: on hover, show full description     DONE
  Todo: make labels more visible            DONE
  Todo: distinguish leaf from branch node   DONE
  Todo: make maximum width of Description labels plus ellipsis         DONE
  Todo: remove Description level - save time for user                  DONE
  Todo: change color (`fill`, NodeEnter) to values or depth... or uid? DONE
  Todo: update instructions with new features                          DONE
  Todo: adjust window size to size of tree
  Todo: urls should be a list of strings?

     Reference: https://observablehq.com/@iashishsingh/navigable-nested-tree
  */

  // Reference: https://observablehq.com/@iashishsingh/navigable-nested-tree
  // Variable Declaration
  //
  
  var width,
    height,
    margin = {top: 20, right: 10, bottom: 20, left: 120},
    levelWidth = [1],

    // Data related
    i = 0,
    dataset,
    dataRoot,
    _rootNode,
    aRootHistory = [],
    aOpenNodesUid = [],
    valueFormatter = d3.format(".2s"),
    duration = 750,
    // Vertical Gap between adjacent nodes
    iNodeSize = 30,
    iLevelGap = 250,
    iDefaultLevel = 2,
    colorScale = d3.scale.category10().range(aColors),
    nodeSizeScale = d3.scale.sqrt().range([2, 22]).clamp(true),
    fnValueField = function(d){ return d.value; },
    fnChildren = function(d){ return (d.values) ? d.values : []; },
    isResized = false,

    // Layout related
    tree,
    diagonal,

    // DOM related
    svg,
    gOuter,
    gLinks,
    gNodes;

  function graph() {
    // 
    // re-initialise variables
    // 
    init();

  }
  
  function init() {

    nodeSizeScale
      .domain([0, fnValueField(dataset)]);

    tree = d3.layout.tree()
      //.size([height, width])
      .nodeSize([iNodeSize, iNodeSize])
      .children(fnChildren);

    diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    gOuter = d3.select(svg)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top*0 + margin.bottom*0)
      .classed("weighted-tree", true)
      /*
      // Reset to root node when clicked on the SVG
      .on("click", function(d){
        _rootNode = dataRoot;
        update(dataRoot);
      })*/
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + ( iNodeSize/2 + height/2) + ")");

    gLinks = gOuter.append("g")
      .classed("links", true);

    gNodes = gOuter.append("g")
      .classed("nodes", true);

    dataRoot = _rootNode = dataset;
    dataRoot.x0 = height / 2;
    dataRoot.y0 = 0;

    // Collapse upto default level
    function visitNode(d) {
      
      if (d.depth < iDefaultLevel){
        fnChildren(d).forEach(visitNode);
      }else if(d.depth >= iDefaultLevel){
        collapseNode(d);
      }
      
    }

    // Collapse a Node; Recursively
    function collapseNode(d) {
      if (d.values && !isExpanded(d)) {
        d._children = d.values;
        d._children.forEach(collapseNode);
        d.children = null;
        d.values = null;
      }else if (d.values){  // expanded node
        // only close the non expanded nodes
        d.values.forEach(collapseNode);
      }
    }

    // is this node expanded uid
    function isExpanded(d) {
      return aOpenNodesUid.indexOf(d.uid) > -1;
    }
    
    visitNode(dataRoot);

    update(dataRoot);

    // reset default open nodes
    aOpenNodesUid = [];

    //centerNode(dataRoot);
    
  }

  /**
   * Returns an array of nodes that are open in the graph
   * @return {array} 
   */
  function getExpandedNodes() {
    var aNodeIds = [];

    function visitNode(d) { 
      if (d.children){
        aNodeIds.push(d.uid);
        d.children.forEach(visitNode);
      }
    }

    visitNode(dataRoot);

    return aNodeIds;
  }


  function getRootNode() {
    return _rootNode;
  }

  function _getGradientId(d) {
    return 'lgd-' + d.source.uid + '-' + d.target.uid;
  }

  function _getLinkUrl(d) {
    return 'url(#'+ _getGradientId(d) +')';
  }

  function _getLinkColor(d, bIsSource) {
    var sName = bIsSource ? 'source' : 'target',
    vf = getValueField() + '-net',
    bIsNegative = d.target[vf] < 0;

    if (bIsNegative) {
      // reverse color if link's net Value is negative
      sName = bIsSource ? 'target' : 'source';
    }
    return d[sName].color;
  }

  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(getRootNode()).reverse(),
        links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * iLevelGap; });

    // Update the nodes…
    var node = gNodes.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
        

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", 1e-6)
        .style("opacity", function(d) { 
          return d._children ? 1 : 0.5; 
        })
        .style("fill", function(d) { 
          // return (d.color = colorScale(d.uid));
          // return (d.color = colorScale(d.values));
          return (d.color = colorScale(d._children));
          // return (d.color = colorScale(d.depth));
        });

    // Add this block for the title and hover styling
    nodeEnter.append("title")
        .text(function(d) { return d.Description ? d.Description : d.key; });

    nodeEnter.append("text")
        .attr("x", function(d) { return fnChildren(d) || d._children ? -5 : 15; })
        .attr("y", -8)
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return fnChildren(d) || d._children ? "end" : "start"; })
        .text(function(d) { return d.key; })
        .style("fill-opacity", 1e-6)
        .style("max-width", "100px") // set your desired max width
        .style("overflow", "hidden")
        .style("text-overflow", "ellipsis")
        .style("white-space", "nowrap");

    // if (d.Description) {}

    node.on("click", click)
      .on("mousemove", onEdgeMouseover)
      .on("mouseout", onMouseout);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        // .attr("r", "8px")
        // .attr("r", function(d){
        //   return nodeSizeScale(fnValueField(d));
        // })
        .attr("r", function(d){
          return d.Description ? 1e-6 : "5px";
        })
        .style("opacity", function(d) { 
          return d._children ? 1 : 0.5; 
        })
        .style("fill", function(d) { 
          return d.color || (d.color = colorScale(d.depth));
        });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);
        // .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = gLinks.selectAll("g.link")
        .data(links, function(d) { return d.target.id; });


    // Enter any new links at the parent's previous position.
    var newLink = link
      .enter()
    .append("g")
      .style("mix-blend-mode", "multiply")
      .classed("link", true);

    var gradient = newLink.append("linearGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("id", function(d){
        return _getGradientId(d);
      })
      .attr("x1", function(d){ 
        return d.source.y;
      })
      .attr("x2", function(d){ 
        return d.target.y;
      });

    gradient.append("stop")
      .attr("offset", "10%")
      .attr("stop-color", function(d){ 
        return _getLinkColor(d, true);
      });

    gradient.append("stop")
      .attr("offset", "90%")
      .attr("stop-color", function(d){ 
        return _getLinkColor(d);
      });


    newLink.append("path")
      .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
      })
      .attr("stroke", function(d) { 
        //return d.source.color;
        return _getLinkUrl(d);
      })
      .attr("stroke-width", function(d){
        return 2 * nodeSizeScale((fnChildren(d.target) || d.target._children || []).length);
      })
      .on("click", function(d){
        highlightNode(d.source);
      });
        

    // Update
    // 

    var uGradient = link.select("linearGradient")
    .attr("id", function(d){
      return _getGradientId(d);
    })
    .attr("x1", function(d){ 
      return d.source.y;
    })
    .attr("x2", function(d){ 
      return d.target.y;
    });

    // reset
    uGradient.selectAll("stop")
      .remove();

    uGradient.append("stop")
      .attr("offset", "10%")
      .attr("stop-color", function(d){ 
        return _getLinkColor(d, true);
      });

    uGradient.append("stop")
      .attr("offset", "90%")
      .attr("stop-color", function(d){ 
        return _getLinkColor(d);
      });


    link.on("click", function(d){
        highlightNode(d.source);
      })
      .on("mousemove", onFlowMouseover)
      .on("mouseout", onMouseout);

    // Transition links to their new position.
    link.select("path")
      .transition()
      .duration(duration)
      .attr("d", diagonal)
      .attr("stroke", function(d) { 
        //return d.source.color;
        return _getLinkUrl(d);
      })
      .attr("stroke-width", function(d){
        return 2 * nodeSizeScale(fnValueField(d.target));
      });

    // Transition exiting nodes to the parent's new position.
    link.exit()
      .transition()
        .duration(duration)
        .remove();

    link.exit()
      .select("path")
      .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return diagonal({source: o, target: o});
        });
        //.remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    // pan the source node
    panSourceNode(nodes, source);

  }

  function childCount(level, n) {

    if (n.children && n.children.length > 0) {
      if (levelWidth.length <= level + 1) levelWidth.push(0);

      levelWidth[level + 1] += n.children.length;
      n.children.forEach(function(d) {
          childCount(level + 1, d);
      });
    }
  };

  function getTopmostNode(d){
    while (d.depth > 1 || (d.depth==0 && d.parent)){
      d = d.parent;
    }
    return d;
  }

  function onEdgeMouseover(d, i) {
    d3.event.stopPropagation();

    var oPayload = {
      iDepthOffset: -1,
      datapoint: d,
      tree: [d]
    };
  }

  function onFlowMouseover(d, i) {
    d3.event.stopPropagation();
    
    var oPayload = {
      iDepthOffset: -1,
      datapoint: d.target,
      tree: [d.source, d.target]
    };

  }

  function onMouseout(d,i) {
  }


  // Toggle children on click.
  function click(d) {
    
    d3.event.preventDefault();
    
    d3.event.stopPropagation();

    if (d.children) {
      d._children = d.children;
      d.children = null;
      d.values = null;
    } else if (!!d.URL) {
      window.open(d.URL, "_blank");
    } else {
      d.values = d._children;
      d.children = d._children;
      d._children = null;
    }

    update(d);

  }

  /**
   * Highlight a node.
   * This node will replace the root node.
   * @param  {[type]} source [description]
   */
  function highlightNode(sourceNode) {
    
    d3.event.preventDefault();
    
    d3.event.stopPropagation();

    // if already highlighted, return to normal state
    if (sourceNode.bHighlighted) {
    
      delete sourceNode.bHighlighted;
    
      // get last root node from history
      // 
      _rootNode = aRootHistory.length ? aRootHistory.pop() : dataRoot;
    
    }else{
      // push current node in history
      // 
      aRootHistory.push(_rootNode);

      // mark current node as highlighted
      sourceNode.bHighlighted = true;
      // replace as root node
      _rootNode = sourceNode;
    }

    update(_rootNode);

    // Update breadcrumb
    // do not update for root node
    if (_rootNode.iDepth > 0) {
    }
  }

  /**
   * Update the svg dimensions and position the
   * souce node such that it is in focus
   * @param  {array} nodes  current nodes
   * @param  {object} source clicked node
   */
  function panSourceNode(nodes, source) {
    
    var depth = d3.max(nodes, function(d){  return d.depth;  }),
      xExtent = d3.extent(nodes, function(a) { return a.x }),
      yMax = d3.max(nodes, function(a) { return a.y }),
      minY = xExtent[0],
      maxY = xExtent[1],
      bbox = gOuter.node().getBBox(),
      bIsSourceCollpasing = !!source._children,
      marginRight = 100,
      iPossibleNextWidth = bbox.width + (bIsSourceCollpasing ? -iLevelGap : iLevelGap), 
      wCalc = depth * iLevelGap,
      hCalc = maxY - minY,
      w = (wCalc < width ? width : wCalc) + margin.left + marginRight,  //Math.min(width, depth * iLevelGap)
      h = (hCalc < height ? height : hCalc ) + margin.top,  //Math.max(height, maxY - minY)
      translateY = h / 2 + iNodeSize/2,
      scrollTop,
      scrollLeft,
      midY = height /2,
      elSvg = d3.select(svg),
      elSvgParent = elSvg.node().parentNode,
      elSvgParentWidth = elSvgParent.getBoundingClientRect().width,
      midYSourceDiff = (midY + minY);

    elSvg
      //.transition()
      //.duration(duration)
      .style("height", (h + 100) + "px")
      .style("width", w + "px");

    /**
     * Determine gOuter translateY position
     */
    if(midYSourceDiff < 0){
      translateY = minY * -1 + iNodeSize;
    }else if(midYSourceDiff > 0 && midYSourceDiff < midY){
      translateY = midY;
    }

    /**
     * Determine svg container's scrollTop
     * when the content size gets bigger than pre-defined height
     */
    if (h > height) {

      if (translateY < height) {
        var currentScrollTop = elSvgParent.scrollTop;
        if(source.x0 < 0){
          //var newScrollTop = (height - translateY);
          var newScrollTop = Math.min(0, translateY - Math.abs(source.x0) - elSvgParent.scrollTop);
          if ( (Math.abs(minY) + maxY) < height && newScrollTop <= midY && currentScrollTop < midY ) {

          }else{
            scrollTop = newScrollTop;
          }
          
        } else { 
          scrollTop = currentScrollTop || 0;
        }
      }else{
        scrollTop = source.x0 + translateY - midY;
      }

      elSvgParent.scrollTop = scrollTop;
    }

    /**
     * Determine svg container's scrollLeft
     * when the content size gets bigger than pre-defined width
     */
    //if (w > yMax && source.depth > 0) {
    if (w > yMax && yMax > elSvgParentWidth && source.depth > 0) {
      scrollLeft = w - yMax + marginRight + margin.left + iNodeSize*2;
    }else if (!bIsSourceCollpasing) {
      scrollLeft = 0;
    }

    if (bIsSourceCollpasing && yMax < (elSvgParentWidth-margin.left)) {
      scrollLeft = 0;
    }

    if (scrollLeft !== undefined) {
      elSvgParent.scrollLeft = scrollLeft;
    }

    // For root node
    if (source.depth == 0) {
      gOuter.transition()
        .duration(duration)
        .attr("transform", "translate(" + margin.left + "," + translateY + ")");  //(iNodeSize + height/2)
    }else{
      // For non-root nodes
      gOuter.transition()
        .duration(duration)
        .attr("transform", "translate(" + (margin.left - marginRight*0) + "," + translateY + ")");
    }

  }

  /**
   * Re-renders the graph using dataset and parameters
   * @return {[type]} [description]
   */
  graph.update = function(){

    // re-initialise variables
    
    nodeSizeScale
      .domain([0, fnValueField(dataset)]);

    d3.select(svg)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top*0 + margin.bottom*0);

    gOuter
      .attr("transform", "translate(" + margin.left + "," + ( iNodeSize/2 + height/2) + ")");
      
    _rootNode.x0 = height / 2;
    _rootNode.y0 = 0;


    // Update graph
    // 
    update(getRootNode());
  }

  // Public Methods / APIs
  // ---------------------

  /**
   * Handle Resizing after the graph has been rendered once
   */
  graph.resize = function(){

    isResized = true;

    graph.update();

  }

  graph.width = function(_){
    if (!arguments.length) {
      return width;
    }
    width = _;
    return graph;
  }

  graph.height = function(_){
    if (!arguments.length) {
      return height;
    }
    height = _;
    return graph;
  }

  graph.valueFormatter = function(_){
    if (!arguments.length) {
      return valueFormatter;
    }
    valueFormatter = _;
    return graph;
  }

  graph.colorScale = function(_){
    if (!arguments.length) {
      return colorScale;
    }
    colorScale = _;
    return graph;
  }

  graph.fnValueField = function(_){
    if (!arguments.length) {
      return fnValueField;
    }
    fnValueField = _;
    return graph;
  }

  graph.fnChildren = function(_){
    if (!arguments.length) {
      return fnChildren;
    }
    fnChildren = _;
    return graph;
  }

  graph.svg = function(_){
    if (!arguments.length) {
      return svg;
    }
    svg = _;
    return graph;
  }

  graph.dataset = function(_){
    if (!arguments.length) {
      return dataset;
    }
    dataset = _;
    return graph;
  }

  graph.defaultDepth =  function(_){
    if (!arguments.length) {
      return iDefaultLevel;
    }
    iDefaultLevel = Math.max(1, _);
    return graph;
  }

  graph.openNodes =  function(_){
    if (!arguments.length) {
      return aOpenNodesUid;
    }
    aOpenNodesUid = _;
    return graph;
  }

  graph.getExpandedNodes = getExpandedNodes;

  return graph;

}
)}

function _getValueField(valueField){return(
function getValueField(){
  return valueField;
}
)}

function _valueField(){return(
'Amount (TC)'
)}

function _aColors(){return(
["#d53e4f","#f46d43","#fdae61","#fee08b","#e6f598","#abdda4","#66c2a5","#3288bd"]
)}

function _d3fetch(){return(
import('https://unpkg.com/d3-fetch?module')
)}

function _d3(require){return(
require("d3@3")
)}

function _workbook(FileAttachment){return(
FileAttachment("LTER-LIFE RM Interview@3.xlsx").xlsx()
)}

function _data(workbook){return(
workbook.sheet(1, {
    headers: true,
  })
)}

function _dataset(createHierarchy,data){return(
createHierarchy(data)
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["LTER-LIFE RM Interview@3.xlsx", {url: new URL("./files/rawdata.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("chart")).define("chart", ["d3","DOM","width","height"], _chart);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("draw")).define("draw", ["d3","chart","WeightedTree","width","height","dataset","valueField"], _draw);
  main.variable(observer("width")).define("width", ["height"], _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("css")).define("css", ["html"], _css);
  main.variable(observer("createHierarchy")).define("createHierarchy", _createHierarchy);
  main.variable(observer("WeightedTree")).define("WeightedTree", ["d3","aColors","getValueField"], _WeightedTree);
  main.variable(observer("getValueField")).define("getValueField", ["valueField"], _getValueField);
  main.variable(observer("valueField")).define("valueField", _valueField);
  main.variable(observer("aColors")).define("aColors", _aColors);
  main.variable(observer("d3fetch")).define("d3fetch", _d3fetch);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("workbook")).define("workbook", ["FileAttachment"], _workbook);
  main.variable(observer("data")).define("data", ["workbook"], _data);
  main.variable(observer("dataset")).define("dataset", ["createHierarchy","data"], _dataset);
  return main;
}
