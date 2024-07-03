
export const configFormOptions = {
    eventsTypes: ['action'],
    eventActions: ['power', 'brightness']

}

export const configFormSchema= {
    "version": "0.9.2",
    "templateVersion": "0.0.1",
    "modules": {
        "awning": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Awning"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.awning.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Awning"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "batteryMonitor": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Battery Monitor"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.batteryMonitor.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Battery Monitor"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "generator": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Generator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.generator.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Generator"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "hvac": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "required": true,
                "value": "hvac"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.hvac.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "hvac"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            },
        },
        "interlock": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Interlocks"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.interlock.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "interlock"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            },
            "interlock-map": {
                "label": 'Interlock Map',
                "path": "config.svg",
                "type": "interlock-map",
                "format": "string",
                "value": ''
            }
        },
        "leveling": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Leveling Legs"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.leveling.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "leveling"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "format": "array",
                "value": []
            }
        },
        "light": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Lights"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.light.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "format": "string",
                "values": "moduleTypes",
                "required": true,
                "readonly": true,
                "value": "light"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "format": "array",
                "value": [
                ]
            },
            "color-1": {
                "label": 'Color 1',
                "path": "config.presets.1",
                "type": "input",
                "format": "hexColorCode",
                "required": true,
                "value": "#ffffff"
            },
            "color-2": {
                "label": 'Color 2',
                "path": "config.presets.2",
                "type": "input",
                "format": "hexColorCode",
                "required": true,
                "value": "#ff0000"
            },
            "color-3": {
                "label": 'Color 3',
                "path": "config.presets.3",
                "type": "input",
                "format": "hexColorCode",
                "required": true,
                "value": "#0034ff"
            }
        },
        "mast": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Masts"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.mast.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "mast"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            },
            "config": {
                "label": "Simultaneous Control",
                "path": "config.simultaneousControl",
                "type": "switch",
                "value": false
            }
        },
        "powerSource": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Power Source"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.shorePower.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "powerSource"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "rackControl": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Rack Control"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.rackControl.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Rack Control"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "sensor": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Sensor"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.sensor.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Sensor"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "slideout": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Slideout"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.slideout.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Slideout"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "ups": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "UPS"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.ups.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "UPS"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "vsat": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "VSAT"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.vsat.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "VSAT"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
        "weatherStation": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Weather Station"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.weatherStation.name" }
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "moduleTypes",
                "readonly": true,
                "value": "Weather Station"
            },
            "systemIds": {
                "label": 'Systems',
                "path": "systemIds",
                "type": "multiselect",
                "values": "existingSystemsForModule",
                "value": []
            }
        },
    },
    "systems": {
        "awning": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Awning System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "Awning"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.awning.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareTimeoutDeploy": {
                "label": "Timeout for Extend (ms)",
                "path": "hardware.timeouts.extend",
                "type": "input",
                "value": "0",
                "group": 1
            },
            "hardwareTimeoutStow": {
                "label": "Timeout for Retract (ms)",
                "path": "hardware.timeouts.retract",
                "type": "input",
                "value": "0",
                "group": 1
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareActionsExtend": {
                "label": "Action - Extend (int)",
                "path": "hardware.actions.extend",
                "type": "input",
                "value": "1",
                "group": 2
            },
            "hardwareActionsRetract": {
                "label": "Action - Retract (int)",
                "path": "hardware.actions.retract",
                "type": "input",
                "value": "1",
                "group": 2
            },
            "hardwareActionsStop": {
                "label": "Action - Stop (int)",
                "path": "hardware.actions.stop",
                "type": "input",
                "value": "0",
                "group": 2
            },
            "separator-4": {
                "type": "separator"
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "batteryMonitor": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Battery Monitor"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "batteryMonitor"
            },
            "separator-0": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.batteryMonitor.name" }
            },
            "separator-1": {
                "type": "separator"
            },
            "configVoltageBoundsMin": {
                "label": "Voltage - Bounds - Min",
                "path": "config.voltage.bounds.min",
                "type": "input",
                "value": "9.0",
                "group": 1
            },
            "configVoltageBoundsMax": {
                "label": "Voltage - Bounds - Max",
                "path": "config.voltage.bounds.max",
                "type": "input",
                "value": 16.0,
                "group": 1
            },
            "configVoltageSafeBoundsMin": {
                "label": "Voltage - Safe Bounds - Min",
                "path": "config.voltage.safeBounds.min",
                "type": "input",
                "value": "11.0",
                "group": 1
            },
            "configVoltageSafeBoundsMax": {
                "label": "Voltage - Safe Bounds - Max",
                "path": "config.voltage.safeBounds.max",
                "type": "input",
                "value": "14.0",
                "group": 1
            },
            "separator-2": {
                "type": "separator"
            },
            "configCurrentBoundsMin": {
                "label": "Current - Bounds - Min",
                "path": "config.current.bounds.min",
                "type": "input",
                "value": -120.0,
                "group": 2
            },
            "configCurrentBoundsMax": {
                "label": "Current - Bounds - Max",
                "path": "config.current.bounds.max",
                "type": "input",
                "value": 120.0,
                "group": 2
            },
            "configCurrentSafeBoundsMin": {
                "label": "Current - Safe Bounds - Min",
                "path": "config.current.safeBounds.min",
                "type": "input",
                "value": -100.0,
                "group": 2
            },
            "configCurrentSafeBoundsMax": {
                "label": "Current - Safe Bounds - Max",
                "path": "config.current.safeBounds.max",
                "type": "input",
                "value": 100.0,
                "group": 2
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareSource": {
                "label": "source",
                "path": "hardware.source",
                "type": "input",
                "value": "nti",
                "group": 3
            },
            "hardwareIndex": {
                "label": "index",
                "path": "hardware.index",
                "type": "input",
                "value": "1",
                "group": 3
            },
            "separator-4": {
                "type": "separator"
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "generator": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Generator"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "mast"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.generator.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareSource": {
                "label": "source",
                "path": "hardware.source",
                "type": "input",
                "value": "nti",
                "group": 1
            },
            "hardwareIndex": {
                "label": "index",
                "path": "hardware.index",
                "type": "input",
                "value": "2",
                "group": 1
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "hvac": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "hvac"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "hvac"
            },
            "separator-0": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.hvac.name" }
            },
            "separator-1": {
                "type": "separator"
            },
            "modes": {
                "label": "Modes",
                "path": "config.modes",
                "type": "multiselect",
                "defaultOptions": ["auto", "cool", "heat", "off"],
            },
            "fanSpeeds": {
                "label": "Fan Speeds",
                "path": "config.fanSpeeds",
                "type": "multiselect",
                "defaultOptions": ["auto", "high", "medium", "low"],
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "exclusions": {
                "label": "Exclusions",
                "path": "hardware.exclusions",
                "type": "exclusions",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            }
        },
        "interlock": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "required": false,
                "value": "Interlock"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "interlock"
            },
            "group": {
                "label": 'Group',
                "path": "hardware.group",
                "type": "input",
                "format": "string",
                "required": false,
                "value": ""
            },
            "separator-0": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.interlock.name" }
            },
            "location": {
                "label": 'Location',
                "path": "config.location",
                "type": "translation",
                "value": { "value": "location.other" }
            },
            "separator-1": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "exclusions": {
                "label": "Exclusions",
                "path": "hardware.exclusions",
                "type": "exclusions",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "separator-3": {
                "type": "separator"
            },
            "x": {
                "label": 'X position',
                "path": "config.x",
                "type": "input",
                "format": "int",
                "value": 0,
                "group": 1
            },
            "y": {
                "label": 'Y position',
                "path": "config.y",
                "type": "input",
                "format": "int",
                "value": 0,
                "group": 1
            },
            "height": {
                "label": 'height',
                "path": "config.height",
                "type": "input",
                "format": "int",
                "value": 0,
                "group": 1
            },
            "width": {
                "label": 'width',
                "path": "config.width",
                "type": "input",
                "format": "int",
                "value": 0,
                "group": 1
            },
            "rotation": {
                "label": 'rotation',
                "path": "config.rotation",
                "type": "input",
                "format": "int",
                "value": 0,
                "group": 1
            },
        },
        "leveling": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Leveling"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "mast"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.leveling.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "exclusions": {
                "label": "Exclusions",
                "path": "hardware.exclusions",
                "type": "exclusions",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            },
        },
        "light": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "format": "string",
                "required": false,
                "value": "Lights"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "format": "string",
                "values": "systemTypes",
                "required": true,
                "readonly": true,
                "value": "light"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.light.name" }
            },
            "location": {
                "label": 'Location',
                "path": "config.location",
                "type": "translation",
                "value": { "value": "location.other" }
            },
            "separator-2": {
                "type": "separator"
            },
            "color": {
                "label": 'Color',
                "path": "config.color",
                "type": "switch",
                "format": "boolean",
                "value": true
            },
            "brightness": {
                "label": 'Brightness',
                "path": "config.brightness",
                "type": "switch",
                "format": "boolean",
                "value": true
            },
            "separator-3": {
                "type": "separator"
            },
            "status": {
                "label": 'Status',
                "path": "state.status",
                "type": "input",
                "format": "text",
                "value": "off"
            },
            "presetId": {
                "label": 'Preset Id',
                "path": "state.presetId",
                "type": "input",
                "format": "number",
                "value": 0
            },
            "brightnessValue": {
                "label": 'Brightness Value',
                "path": "state.brightness",
                "type": "input",
                "format": "double",
                "value": 0
            },
            "separator-4": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "hardwareInputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "format": "array",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "format": "array",
                "value": []
            },
            "exclusions": {
                "label": "Exclusions",
                "path": "hardware.exclusions",
                "type": "exclusions",
                "format": "array",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "format": "object",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "format": "array",
                "value": []
            }
        },
        "mast": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Mast"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "mast"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.mast.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "height": {
                "label": 'Height',
                "path": "config.height",
                "type": "switch",
                "value": false
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "exclusions": {
                "label": "Exclusions",
                "path": "hardware.exclusions",
                "type": "exclusions",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            },
        },
        "powerSource": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Power Source"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "powerSource"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.shorePower.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "configVoltageBoundsMin": {
                "label": "Voltage - Bounds - Min",
                "path": "config.voltage.bounds.min",
                "type": "input",
                "value": "90.0",
                "group": 1
            },
            "configVoltageBoundsMax": {
                "label": "Voltage - Bounds - Max",
                "path": "config.voltage.bounds.max",
                "type": "input",
                "value": 150.0,
                "group": 1
            },
            "configVoltageSafeBoundsMin": {
                "label": "Voltage - Safe Bounds - Min",
                "path": "config.voltage.safeBounds.min",
                "type": "input",
                "value": "110.0",
                "group": 1
            },
            "configVoltageSafeBoundsMax": {
                "label": "Voltage - Safe Bounds - Max",
                "path": "config.voltage.safeBounds.max",
                "type": "input",
                "value": "130.0",
                "group": 1
            },
            "separator-3": {
                "type": "separator"
            },
            "configCurrentBoundsMin": {
                "label": "Current - Bounds - Min",
                "path": "config.current.bounds.min",
                "type": "input",
                "value": 0.0,
                "group": 2
            },
            "configCurrentBoundsMax": {
                "label": "Current - Bounds - Max",
                "path": "config.current.bounds.max",
                "type": "input",
                "value": 100.0,
                "group": 2
            },
            "configCurrentSafeBoundsMin": {
                "label": "Current - Safe Bounds - Min",
                "path": "config.current.safeBounds.min",
                "type": "input",
                "value": 0.0,
                "group": 2
            },
            "configCurrentSafeBoundsMax": {
                "label": "Current - Safe Bounds - Max",
                "path": "config.current.safeBounds.max",
                "type": "input",
                "value": 80.0,
                "group": 2
            },
            "separator-4": {
                "type": "separator"
            },
            "configFrequencyBoundsMin": {
                "label": "Frequency - Bounds - Min",
                "path": "config.frequency.bounds.min",
                "type": "input",
                "value": 55.0,
                "group": 3
            },
            "configFrequencyBoundsMax": {
                "label": "Frequency - Bounds - Max",
                "path": "config.frequency.bounds.max",
                "type": "input",
                "value": 65.0,
                "group": 3
            },
            "configFrequencySafeBoundsMin": {
                "label": "Frequency - Safe Bounds - Min",
                "path": "config.frequency.safeBounds.min",
                "type": "input",
                "value": 58.0,
                "group": 3
            },
            "configFrequencySafeBoundsMax": {
                "label": "Frequency - Safe Bounds - Max",
                "path": "config.frequency.safeBounds.max",
                "type": "input",
                "value": 62.0,
                "group": 3
            },
            "separator-5": {
                "type": "separator"
            },
            "hardwareSerialNumber": {
                "label": "sn",
                "path": "hardware.sn",
                "type": "input",
                "value": "000-000-000"
            },
            "separator-6": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "rackControl": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Rack Control System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "Rack Control"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.rackControl.name" }
            },
            "location": {
                "label": 'Location',
                "path": "config.location",
                "type": "translation",
                "value": { "value": "location.other" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareActionsOn": {
                "label": "Action - On (int)",
                "path": "hardware.actions.on",
                "type": "input",
                "value": "1",
                "group": 4
            },
            "hardwareActionsOff": {
                "label": "Action - Off (int)",
                "path": "hardware.actions.off",
                "type": "input",
                "value": "0",
                "group": 4
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareOutputSelectionValue": {
                "label": "Hardware Output - Selection Value",
                "path": "hardware.outputs.selection.value",
                "type": "input",
                "value": "1",
                "group": 1
            },
            "hardwareOutputSelectionUnit": {
                "label": "Hardware Output - Selection Unit",
                "path": "hardware.outputs.selection.unit",
                "type": "input",
                "value": "1",
                "group": 1
            },
            "hardwareOutputSelectionBlock": {
                "label": "Hardware Output - Selection Block",
                "path": "hardware.outputs.selection.block",
                "type": "input",
                "value": "1",
                "group": 1
            },
            "hardwareOutputSelectionBit": {
                "label": "Hardware Output - Selection Bit",
                "path": "hardware.outputs.selection.bit",
                "type": "input",
                "value": "2",
                "group": 1
            },
            "separator-4": {
                "type": "separator"
            },
            "hardwareOutputPowerUnit": {
                "label": "Hardware Output - Power Unit",
                "path": "hardware.outputs.power.unit",
                "type": "input",
                "value": "1",
                "group": 2
            },
            "hardwareOutputPowerBlock": {
                "label": "Hardware Output - Power Block",
                "path": "hardware.outputs.power.block",
                "type": "input",
                "value": "1",
                "group": 2
            },
            "hardwareOutputPowerBit": {
                "label": "Hardware Output - Power Bit",
                "path": "hardware.outputs.power.bit",
                "type": "input",
                "value": "3",
                "group": 2
            },
            "separator-5": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Outputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "sensor": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Sensor System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "Sensor"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.sensor.name" }
            },
            "location": {
                "label": 'Location',
                "path": "config.location",
                "type": "translation",
                "value": { "value": "location.other" }
            },
            "separator-2": {
                "type": "separator"
            },
            "configAlertThreshold": {
                "label": 'Alert Threshold',
                "path": "config.alertThreshold",
                "type": "input",
                "value": 1
            },
            "configSensorSubType": {
                "label": "Type of Sensor",
                "path": "config.type",
                "type": "dropdown",
                "values": "sensorTypes",
                "value": "temperature"
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareSource": {
                "label": "Source",
                "path": "hardware.source",
                "type": "input",
                "value": "mqtt",
                "readonly": true,
                "group": 1
            },
            "hardwareMQTTEventType": {
                "label": "MQTT Event - Type",
                "path": "hardware.event.type",
                "type": "input",
                "value": "sensor",
                "readonly": true,
                "group": 1
            },
            "hardwareMQTTEventLog": {
                "label": "MQTT Event - Logged?",
                "path": "hardware.event.log",
                "type": "switch",
                "value": true,
                "group": 1
            },
            "separator-5": {
                "type": "separator"
            },
            "hardwareMQTTTopic": {
                "label": "MQTT Topic - (must match Type of Sensor)",
                "path": "hardware.topic",
                "type": "dropdown",
                "values": "sensorTypes",
                "value": "temperature",
                "group": 1
            },
            "hardwareMQTTEventKey": {
                "label": "MQTT Key - (must match Type of Sensor)",
                "path": "hardware.event.key",
                "type": "dropdown",
                "values": "sensorTypes",
                "value": "temperature",
                "group": 1
            },
            "separator-4": {
                "type": "separator"
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "slideout": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Slideout System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "Slideout"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.slideout.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareTimeoutDeploy": {
                "label": "Timeout for Extend (ms)",
                "path": "hardware.timeouts.extend",
                "type": "input",
                "format": "int",
                "value": "0",
                "group": 2
            },
            "hardwareTimeoutStow": {
                "label": "Timeout for Retract (ms)",
                "path": "hardware.timeouts.retract",
                "type": "input",
                "format": "int",
                "value": "0",
                "group": 2
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareActionsExtend": {
                "label": "Action - Extend (int)",
                "path": "hardware.actions.extend",
                "type": "input",
                "format": "int",
                "value": "1",
                "group": 1
            },
            "hardwareActionsRetract": {
                "label": "Action - Retract (int)",
                "path": "hardware.actions.retract",
                "type": "input",
                "format": "int",
                "value": "1",
                "group": 1
            },
            "hardwareActionsStop": {
                "label": "Action - Stop (int)",
                "path": "hardware.actions.stop",
                "type": "input",
                "format": "int",
                "value": "0",
                "group": 1
            },
            "separator-4": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "ups": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "UPS"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "batteryMonitor"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.ups.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareSource": {
                "label": "source",
                "path": "hardware.source",
                "type": "input",
                "value": "nti",
                "group": 1
            },
            "hardwareIndex": {
                "label": "index",
                "path": "hardware.index",
                "type": "input",
                "value": "1",
                "group": 1
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            },
        },
        "vsat": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "VSAT System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "VSAT"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.vsat.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareTimeoutDeploy": {
                "label": "Timeout for Deploy (ms)",
                "path": "hardware.timeouts.deploy",
                "type": "input",
                "value": "0",
                "group": 1
            },
            "hardwareTimeoutStow": {
                "label": "Timeout for Stow (ms)",
                "path": "hardware.timeouts.stow",
                "type": "input",
                "value": "0",
                "group": 1
            },
            "hardwareActionsDeploy": {
                "label": "Action - Deploy (int)",
                "path": "hardware.actions.deploy",
                "type": "input",
                "value": "1",
                "group": 1
            },
            "hardwareActionsStow": {
                "label": "Action - Stow (int)",
                "path": "hardware.actions.stow",
                "type": "input",
                "value": "0",
                "group": 1
            },
            "separator-3": {
                "type": "separator"
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
        "weatherStation": {
            "displayName": {
                "label": 'Display Name',
                "path": "meta.id",
                "additionalPaths": ["id"],
                "type": "input",
                "value": "Weather Station System"
            },
            "type": {
                "label": 'Type',
                "path": "type",
                "type": "dropdown",
                "values": "systemTypes",
                "readonly": true,
                "value": "Weather Station"
            },
            "separator-1": {
                "type": "separator"
            },
            "name": {
                "label": 'Name',
                "path": "name",
                "type": "translation",
                "value": { "value": "modules.weatherStation.name" }
            },
            "separator-2": {
                "type": "separator"
            },
            "hardwareInputs": {
                "label": "Inputs",
                "path": "hardware.inputs",
                "type": "hardwareInputs",
                "value": []
            },
            "hardwareOutputs": {
                "label": "Outputs",
                "path": "hardware.outputs",
                "type": "hardwareOutputs",
                "value": []
            },
            "triggers": {
                "label": "Triggers",
                "path": "triggers",
                "type": "triggers",
                "value": []
            },
            "preconditions": {
                "label": "Preconditions",
                "path": "preconditions",
                "type": "preconditions",
                "value": []
            }
        },
    }
}