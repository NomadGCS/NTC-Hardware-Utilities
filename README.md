This is a collection of utility apps which run in a windows based electron app.

## Apps
- Interlock Mapper - Small tool used to quickly get interlock SVG coordinates
- Config-builder - Tool used to generate and update asset configs
 



## Adding a new application or window

1.  Add new entry point in 'forge.config.js' (take note of 'name' field)
2.  Add variables in 'main.js' for the new entry points.  These use the name field above (see 'WEB APPS & EXTERNAL SITES' section).
3.  Add menu option in 'main.js' for the new application (see 'MENU' section )