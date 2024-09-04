
// export const configFileSample= {
//     "version": "0.9.2",
//     "modules": {
//     },
//     "systems": {
//     }
// }


export const configFileSample= {
    "version": "0.9.2",
    "modules": {
        "acb5abe5-6de1-4856-b1db-9b3cb2cf3a9c": {
            "name": {
                "value": "modules.light.name"
            },
            "meta": {
                "id": "Lights"
            },
            "type": "light",
            "systemIds": [
                "bd0a104d-be72-4c51-a071-4e2d3628048b",
                "139590ce-2971-4e26-880b-2ff4b1ba29dc",
                "025c66d3-35c0-47a1-aaba-3e41e4456b14"
            ],
            "config": {
                "presets": {
                    "1": "#ffffff",
                    "2": "#ff0000",
                    "3": "#0034ff"
                }
            }
        },
        "9f75f709-c65e-4006-a8df-7d2aaaf7fb3a": {
            "name": {
                "value": "display.name_1",
                "params": {
                    "name": { "value": "modules.slideout.name" },
                    "location1": { "value": "location.front" }
                }
            },
            "meta": {
                "id": "Slideouts - Front"
            },
            "type": "slideout",
            "systemIds": [
                "2bce0e30-ca02-4437-93a5-7598c1ed3ac7",
                "ea088168-96a5-4b97-b241-7cb66f919536"
            ],
            "config": {
                "simultaneousControl": true
            }
        },
        "b4ab4584-667b-486d-bc1b-7737941f9672": {
            "name": {
                "value": "display.name_1",
                "params": {
                    "name": { "value": "modules.interlock.name" },
                    "location1": { "value": "location.streetside" }
                }
            },
            "meta": {
                "id": "Interlocks - Streetside"
            },
            "type": "interlock",
            "systemIds": [
                "a215068e-d2fe-4bc5-90e9-1003a0b2d27a"
            ],
            "config": {
                "svg": "RedstoneSSInterlockMap"
            }
        },
        "9e1115e0-2aad-4182-9a6c-22c2ae97d683": {
            "name": {
                "value": "modules.mast.name"
            },
            "meta": {
                "id": "masts"
            },
            "type": "mast",
            "systemIds": [
                "079a9599-0f66-4d48-b3ec-3366da22e97a",
                "63f498ae-5c74-4307-b0ac-109b82319604"
            ],
            "config": {
                "simultaneousControl": false
            }
        },
        "3685bda7-78dd-44cb-8593-e78809651089": {
            "name": {
                "value": "display.name_1",
                "params": {
                    "name": { "value": "modules.hvac.name" },
                    "location1": { "value": "location.rear" }
                }
            },
            "meta": {
                "id": "HVAC - Rear"
            },
            "type": "hvac",
            "systemIds": [
                "069dfb9a-216d-46ea-abb2-6878eb381642"
            ],
            "config": {
            }
        },
    },
    "systems": {
        "bd0a104d-be72-4c51-a071-4e2d3628048b": {
            "name": {
                "value": "display.name_1",
                "params": {
                    "name": {
                        "value": "modules.light.name_other"
                    },
                    "location1": { "value": "location.center" }
                }
            },
            "meta": {
                "id": "Center Lights"
            },
            "type": "light",
            "config": {
                "location": {
                    "value": "common.room",
                    "params": {  "room": {   "value": "3" } }
                },
                "color": true,
                "brightness": true
            },
            "hardware": {
                "actions": {
                    "on": 1,
                    "off": 0,
                    "up": 0.1,
                    "down": -0.1
                },
                "inputs": [
                    {
                        "unit": 1,
                        "block": 9,
                        "bit": 1,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "on"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 9,
                        "bit": 0,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "off"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 8,
                        "bit": 7,
                        "event": {
                            "type": "action",
                            "key": "brightness",
                            "value": "up"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 8,
                        "bit": 6,
                        "event": {
                            "type": "action",
                            "key": "brightness",
                            "value": "down"
                        }
                    }
                ],
                "universePosition": 41
            },
            "triggers": [
            ],
            "preconditions": [
            ]
        },
        "139590ce-2971-4e26-880b-2ff4b1ba29dc": {
            "name": {
                "value": "display.descriptiveName_2",
                "params": {
                    "description1": { "value": "modules.light.variants.beacon" },
                    "name": {
                        "value": "modules.light.name_other"
                    },
                    "location1": { "value": "modules.mast.name" },
                    "location2": { "value": "location.front" }
                }
            },
            "meta": {
                "id": "Front Mast Beacon Lights"
            },
            "type": "light",
            "config": {
                "location": {
                    "value": "misc.exterior"
                },
                "color": false,
                "brightness": false
            },
            "hardware": {
                "actions": {
                    "on": 1,
                    "off": 0
                },
                "inputs": [
                    {
                        "unit": 1,
                        "block": 13,
                        "bit": 1,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "on"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 12,
                        "bit": 6,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "off"
                        }
                    }
                ],
                "outputs": [
                    {
                        "unit": 1,
                        "block": 6,
                        "bit": 5,
                        "event": {
                            "type": "sensor",
                            "key": "status",
                            "values": {
                                "0": "off",
                                "1": "on"
                            }
                        }
                    }
                ]
            },
            "triggers": [
            ],
            "preconditions": [
            ]
        },
        "025c66d3-35c0-47a1-aaba-3e41e4456b14": {
            "name": {
                "value": "display.descriptiveName_3",
                "params": {
                    "description1": { "value": "modules.light.variants.task" },
                    "name": {
                        "value": "modules.light.name_other"
                    },
                    "location1": { "value" : "modules.slideout.name"},
                    "location2": { "value": "location.rear" },
                    "location3": { "value": "location.cs" }
                }
            },
            "meta": {
                "id": "CS Slideout Rear Task Lights"
            },
            "type": "light",
            "config": {
                "location": {
                    "value": "common.room",
                    "params": {  "room": {   "value": "3" } }
                },
                "color": true,
                "brightness": true
            },
            "hardware": {
                "actions": {
                    "on": 1,
                    "off": 0,
                    "up": 0.1,
                    "down": -0.1
                },
                "inputs": [
                    {
                        "unit": 1,
                        "block": 6,
                        "bit": 7,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "on"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 6,
                        "bit": 6,
                        "event": {
                            "type": "action",
                            "key": "power",
                            "value": "off"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 6,
                        "bit": 5,
                        "event": {
                            "type": "action",
                            "key": "brightness",
                            "value": "up"
                        }
                    },
                    {
                        "unit": 1,
                        "block": 6,
                        "bit": 4,
                        "event": {
                            "type": "action",
                            "key": "brightness",
                            "value": "down"
                        }
                    }
                ],
                "universePosition": 66
            },
            "triggers": [
            ],
            "preconditions": [
            ]
        },
        "a215068e-d2fe-4bc5-90e9-1003a0b2d27a": {
            "name": {
                "value": "display.location_3",
                "params": {
                    "location1": { "value": "misc.fiber" },
                    "location2": { "value": "misc.passthrough" },
                    "location3": { "value": "misc.door" }
                }
            },
            "meta": {
                "id": "SS Fiber Passthrough Door Interlock"
            },
            "type": "interlock",
            "config": {
                "location": {
                    "value": "common.room",
                    "params": {  "room": {   "value": "1" } }
                },
                "x": 150.0,
                "y": 160.0,
                "width": 20.0,
                "height": 20.0,
                "rotation": 0.0
            },
            "hardware": {
                "inputs": [
                    {
                        "unit": 2,
                        "block": 2,
                        "bit": 3,
                        "event": {
                            "type": "sensor",
                            "key": "status",
                            "values": {
                                "0": "unmet",
                                "1": "met"
                            }
                        }
                    }
                ],
                "group": "door",
                "safety": "met",
                "name": {
                    "value": "SS Fiber Passthrough Door Interlock"
                },
                "meta": {
                    "id": "SS Fiber Passthrough Door Interlock"
                }
            },
            "triggers": [
            ],
            "preconditions": [
            ]
        },
    }
}
