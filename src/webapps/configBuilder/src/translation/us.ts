// import { Translation } from '../Translation'
// import { MAXIMUM_PASSWORD_LENGTH, NON_STIG_MINIMUM_PASSWORD_LENGTH, PASSWORD_HISTORY_SIZE, SPECIAL_CHARS, STIG_MINIMUM_PASSWORD_LENGTH } from '@nomadgcs/ntc-asset-kt'

export let english = {
// Put all translations in 'Title Case' and in Alphabetical order across every file
    translation: {
        alert: {
            assets: {
                helpMessage: 'Select the asset for ALERT details.',
                modalTitle: 'ALERTS: Recalls & Maintenance',
                message: {
                    maintenanceCompleted: 'Maintenance Complete',
                    maintenanceScheduled: 'Maintenance Scheduled',
                    recallComplete: 'Recall Complete',
                    recallIssued: 'Recall Issued'
                }
            }
        },
        errors: {
            general: 'Error',
            404: 'Resource not found'
        },
        reauthenticate: {
            modalTitle: 'Reauthenticate for elevated privileges',
            success: 'Successfully reauthenticated',
            info: 'You will have elevated privileges for 30 minutes'
        },
        logoff: {
            message: 'User has been logged out and session has been terminated'
        },
        buttons: {
            location: {
                all: 'All',
                both: 'Both',
                curb: 'Curbside',
                street: 'Streetside'
            },
            longPress: {
                label: 'Hold'
            }
        },
        common: {
            name: 'Name',
            room: 'Room {{room}}',
            start: 'Start',
            stop: 'Stop',
            starting: 'Start',
            stopping: 'Stop',
            status: 'Status',
            temperature: 'Temperature',
            temp: 'Temp.',
            volts: 'Volts',
            stopAll: 'Stop',
            top: 'Top',
            bottom: 'Bottom',
            on: 'On',
            off: 'Off',
            cancel: 'Cancel',
            actions: {
                label: 'Actions',
                save: 'Save',
                create: 'Create {{name}}',
                delete: 'Delete',
                cancel: 'Cancel'
            }
        },
        confirmation: {
            modalTitle: 'Additional Confirmation Required'
        },
        contact: {
            phone: 'Phone',
            email: 'Email',
            mailingAddress: 'Mailing Address',
            headQuarters: 'Headquarters',
            linkText: 'Support'
        },
        display: {
            name_1: '{{name}} - {{location1}}',
            name_2: '{{name}} - {{location1}} {{location2}}',
            name_3: '{{name}} - {{location1}} {{location2}} {{location3}}',
            descriptiveName_1: '{{description1}} {{name}} - {{location1}}',
            descriptiveName_2: '{{description1}} {{name}} - {{location1}} {{location2}}',
            descriptiveName_3: '{{description1}} {{name}} - {{location1}} {{location2}} {{location3}}',
            location_1: '{{location1}}',
            location_2: '{{location1}} {{location2}}',
            location_3: '{{location1}} {{location2}} {{location3}}',
            location_4: '{{location1}} {{location2}} {{location3}} {{location4}}'
        },
        dropDowns: {
            moduleHeader: {
                close: 'Close',
                collapse: 'Collapse',
                addToDashboard: 'Add to Dashboard',
                deleteFromDashboard: 'Delete from Dashboard',
                graphView: 'Graph View',
                expand: 'Expand',
                lock: 'Lock',
                settings: 'Settings',
                sliderType: 'Slider Type'
            }
        },
        forms: {
            mode: {
                create: 'Create',
                edit: 'Edit',
                view: 'View',
                delete: 'Delete',
                hierarchy: 'Hierarchy',
                clone: 'Duplicate',
                duplicate: 'Duplicate',
                assignment: 'Assignment',
                lock: 'Lock',
                unlock: 'Unlock'
            },
            button: {
                saveChanges: 'Save Changes',
                submit: 'Submit',
                reset: 'Reset',
                ok: 'Ok',
                cancel: 'Cancel',
                delete: 'Delete',
                forcePassword: 'Update Password',
                addRole: 'Add Role',
                upload: 'Upload',
                uploadPhotoVideo: 'Upload Photo/Video',
                login: 'Login',
                save: 'Save',
                saveAndContinue: 'Save & Continue',
                saveAndExit: 'Save & Exit',
                view: 'View',
                edit: 'Edit',
                clone: 'Duplicate',
                next: 'Next',
                back: 'Back',
                return: 'Return',
                lock: 'Lock Account',
                unlock: 'Unlock Account',
                changePassword: 'Change Password',
                generatePassword: 'Generate Password',
                pair: 'Pair',
                keypair: 'Show KeyPair',
                toggleOn: 'On',
                toggleOff: 'Off',
            },
            toolbar: {
                button: {
                    create: 'Create',
                    delete: 'Delete',
                    edit: 'Edit',
                    clone: 'Clone',
                    export: 'Export',
                    import: 'Import'
                },
                label: { selected: 'selected' }
            },
            permissions: {
                field: {
                    resource: { label: 'Resource', validation: { required: '' } },
                    action: { label: 'Action', validation: { required: '' } },
                    description: { label: 'Description', validation: { required: '' } }
                }
            },
            role: {
                title: 'Role',
                modal: {
                    confirm: {
                        delete: {
                            message: 'This will permanently delete this role and affect everyone assigned this role. Do you wish to proceed ?',
                            title: 'Delete Role'
                        }
                    },
                    view: {
                        header: {
                            roles: 'Roles',
                            modules: 'Assigned Modules and Actions',
                            actions: 'User Actions',
                            users: 'Individuals Currently Assigned to Roles'
                        }
                    }
                },
                field: {
                    name: {
                        label: 'Role Name',
                        validation: { required: 'Role name is required' }
                    },
                    level: {
                        label: 'Level',
                        validation: {
                            required: '',
                            optional: 'Role level must be a positive whole number'
                        },
                        notes: 'Note: A smaller value is expected for a \'Higher\' role, and only positive integers greater than zero are allowed'
                    },
                    description: {
                        label: 'Role Description',
                        validation: { required: 'Role description is required' }
                    },
                    permissions: {
                        label: 'Role Permissions',
                        validation: { required: 'Role permission(s) is required' }
                    },
                    active: {
                        label: 'Active',
                        validation: { required: '' }
                    },
                    organizationId: {
                        label: 'Organization',
                        validation: { required: '' }
                    },
                    userId: {
                        label: 'User',
                        validation: { required: 'User is required' },
                        dropdownLabel: 'Select User'
                    },
                    roles: {
                        label: 'Roles',
                        validation: { required: 'Role(s) are required' }
                    }
                },
                name: {
                    mechanics: 'Mechanics',
                    drivers: 'Drivers',
                    operators: 'Operators',
                    administrators: 'Administrators',
                    viewer: 'Viewer',
                    owner: 'owner'
                },
                roleDeletion: 'The role cannot be deleted as it is currently in use. Please remove the role from any users before attempting to delete it again.',
                insufficientPrivileges: 'Your role does not have sufficient privileges for this action',
                priorityConflict: 'Cannot make a role a higher priority than your own role.',
                failedPriorities: 'Failed to update role priorities.',
                updateSuccessful: 'Role updated successfully!',
                rolesUpdated: 'Roles updated'
            },
            group: {
                title: 'Group',
                modal: {
                    confirm: {
                        delete: {
                            message: 'Are you sure to delete the selected item(s) ?',
                            title: 'Delete Group'
                        }
                    }
                },
                field: {
                    name: {
                        label: 'Group Name',
                        validation: { required: 'Group name is required' }
                    },
                    description: {
                        label: 'Group Description',
                        validation: { required: 'Group description is required' }
                    },
                    roles: {
                        label: 'Group Roles',
                        validation: { required: 'Group role(s) is required' }
                    },
                    active: {
                        label: 'Active',
                        validation: { required: '' }
                    }
                },
                name: {
                    roles: 'Group of Roles',
                    users: 'Group of Users'
                }
            },
            user: {
                title: 'User',
                modal: {
                    confirm: {
                        delete: {
                            message: 'Do you want to permanently delete this user ? All data will be lost.',
                            title: 'Delete User'
                        },
                        lock: {
                            message: 'Do you want to temporarily lock this user\'s account ?',
                            title: 'Lock Account'
                        },
                        unlock: {
                            message: 'Do you want to unlock this user\'s account ?',
                            title: 'Unlock Account'
                        }
                    }
                },
                personalInfo: { title: 'Personal Information' },
                security: { title: 'Security' },
                preferences: {
                    title: 'Preferences',
                    language: 'Language',
                    english: 'English',
                    spanish: 'Spanish',
                    theme: 'Theme',
                    light: 'Light',
                    dark: 'Dark',
                },
                permissions: {
                    title: 'Permissions',
                    legend: 'Legend',
                    type: {
                        systems: 'Systems',
                        nodes: 'Nodes',
                        users: 'Users',
                        logs: 'Logs',
                        modules: 'Modules',
                        others: 'Others'
                    },
                },
                notifications: {
                    title: 'Notifications',
                    modules: 'Modules',
                    bannerAlert: 'Banner Alert',
                },
                field: {
                    firstName: { label: 'First Name', validation: { required: 'Firstname is required' } },
                    lastName: { label: 'Last Name', validation: { required: 'Lastname is required' } },
                    name: { label: 'Name', validation: { required: 'Name is required' } },
                    email: {
                        label: 'Email Address',
                        validation: {
                            required: 'Email is required',
                            email: 'Email is invalid'
                        }
                    },
                    username: {
                        label: 'Username',
                        validation: {
                            required: 'Username is required',
                            min: 'Username must be at least 6 characters',
                            max: 'Username must not exceed 20 characters'
                        }
                    },
                    phone: { label: 'Phone', validation: { required: 'Phone number is required' } },
                    existingPassword: { label: 'Original Password', required: 'Original password is required' },                    
                    confirmPassword: {
                        label: 'Confirm Password',
                        validation: {
                            required: 'Confirm Password is required',
                            match: 'Confirm Password does not match'
                        }
                    },
                    roles: { label: 'User Roles', validation: { required: 'Role(s) are required' } },
                    groups: { label: 'User Groups', validation: { required: 'Group(s) are required' } },
                    active: { label: 'Active', validation: { required: '' } },
                    company: { label: 'Company', validation: { required: 'Company name is required' } }
                },
                buttons: {
                    assignRole: 'Assign Roles',
                    create: 'Add User',
                    manageRole: 'Role Management',
                    uploadImage: 'Upload Image',
                    updateImage: 'Update Image',
                }
            },
            nodes: {
                modal: {
                    confirm: {
                        delete: {
                            message: 'Do you want to permanently delete this key? All data will be lost.',
                            title: 'Delete Key'
                        },
                        deleteAndPair: {
                            message: 'Do you want to recreate and pair this key?',
                            title: 'Pair'
                        }
                    },
                    pair: { title: 'Pair Key', message: 'A key has been created and paired.' }
                },
                field: {
                    name: { label: 'Name', validation: { required: 'Node name is required' } },
                    access: { label: 'Access', validation: { required: 'Node access is required' } },
                    roles: { label: 'Roles', validation: { required: '' } },
                    modules: { label: 'Modules', validation: { required: '' } },
                    secret: { label: 'Secret', validation: { required: 'Secret is required to pair a node' } }
                },
                buttons: {
                    create: 'Generate Key',
                    saveAndPair: 'Save & Pair',
                    deleteAndPair: 'Delete & Pair',
                    pair: 'Pair'
                }
            },
            wizard: {
                moduleSystemName: '{{module}} - {{system}}',
                message: {
                    noWizard: 'This file does not contain a wizard.  Please select a different file',
                    inValidJSON: 'Import failed: Invalid JSON format detected. Please check and try again',
                    stepsHasSystems: 'There are {{count}} steps which have systems.'
                },
                modal: {
                    confirm: {
                        delete: {
                            message: 'Are you sure you wish to delete the selected wizard(s)?',
                            title: 'Delete Wizard'
                        },
                        deleteAction: {
                            message: 'Are you sure you wish to delete the selected step?',
                            title: 'Delete Step'
                        },
                        deleteChecklist: {
                            message: 'Are you sure you wish to delete the selected checklist item?',
                            title: 'Delete Checklist Item'
                        }
                    }
                },
                title: 'Create a Wizard',
                field: {
                    name: {
                        label: 'Wizard Name',
                        validation: { required: 'Wizard name is required' }
                    },
                    type: {
                        label: 'Type',
                        validation: { required: 'Type is required' }
                    },
                    description: {
                        label: 'Description',
                        validation: { required: 'Description is required' }
                    },
                    wizardLevel: {
                        label: 'Level',
                        validation: { required: '' }
                    },
                    notification: {
                        reorder: 'Step reordered successfully',
                        reorderCheck: 'Check reordered successfully',
                        deleted: 'Step deleted successfully',
                        created: 'Step created successfully',
                        stepUpdated: 'Step updated successfully',
                        wizardUpdated: 'Wizard updated successfully'
                    },
                    actions: {
                        label: 'Actions',
                        systemId: {
                            manualStep: 'Manual Step',
                            label: 'Select an action module',
                            header: 'Select systems in order of action',
                            defaultLabel: 'Select System',
                            validation: { required: 'Action system is required' }
                        },
                        required: { label: 'Required', validation: { required: 'This field is required' } },
                        expandHelpText: 'Expand each item to add detailed photos, checklists, and safety checks to each hardware action'
                    },
                    preconditions: {
                        name: 'Checklist',
                        header: 'Enter Checklist Requirements',
                        checks: {
                            label: 'Checklist Description',
                            validation: { required: 'Checklist description is required' }
                        },
                        photo: { label: 'Add optional photos for the step' }
                    },
                    checklist: {
                        safety: 'Safety Checklist',
                        standard: 'Standard Checklist'
                    },
                    checks: {
                        message: {
                            sortOrderSuccess: 'Checks order updated!'
                        }
                    },
                    safetyChecklist: {
                        name: 'Safety Checklist',
                        checks: {
                            label: 'Safety Check Description',
                            validation: { required: 'Safety check description is required' }
                        },
                        photo: { label: 'Add optional photos for the step' }
                    },
                    standardChecklist: {
                        name: 'Standard Checklist',
                        checks: {
                            label: 'Standard Check Description',
                            validation: { required: 'Standard check description is required' }
                        },
                        photo: { label: 'Add optional photos for the step' },
                        selectAll: 'Select All'
                    },
                    manualStep: 'Manual Step',
                    wizardSelectSystem: 'Manual Step',
                    instruction: { label: 'Instructions', validation: { required: 'Instructions is required' } },
                    active: { label: 'Active', validation: { required: '' } },
                    caption: { label: 'Caption', required: { label: '', validation: { required: '' } } },
                    stepName: { label: 'Step Name', validation: { required: 'Step name is required' } },
                },
                buttons: {
                    addStep: 'Add Step',
                    addStepNotification: 'Step added succesfully',
                    addSafetyCheck: 'Add Safety Check',
                    addStandardCheck: 'Add Standard Check',
                    addEditPhoto: 'Add/Edit photos/video',
                    exportWizards: 'Export Wizards',
                    browse: 'Browse',
                    deleteAction: 'Delete action',
                    deleteItem: 'Delete Item',
                    linkSystem: 'Link Systems',
                    linkSystemMessage: 'The following steps have been matched to systems.',
                    linkNotificationMessage: 'Step linked successfully',
                    manuallyMatchSteps: 'Click Link Systems to manually match the steps with a system from the current asset-config.',
                    previewWizard: 'Preview Wizard',
                    preview: 'Preview',
                    done: 'Done',
                    saveOrder: 'Update order',
                    runWizard: 'Run Wizard',
                    run: 'Run'
                }
            },
            defaultAction: {
                title: 'Create default action configuration',
                field: {
                    notes: { label: 'Notes', validation: { required: 'Notes are required' } },
                    photos: { label: 'Add photos for the step' },
                    active: { label: 'Active' }
                }
            },
            training: {
                title: 'Training',
                modal: {
                    confirm: {
                        delete: {
                            message: 'Are you sure you want to delete this item?',
                            title: 'Delete Training'
                        }
                    }
                },
                field: {
                    name: { label: 'Training Name', validation: { required: 'Training name is required' } },
                    repeatCount: {
                        label: 'Repeat Count', validation:
                            {
                                required: 'Repeat count is required',
                                min: 'Repeat count must be a value greater than 0',
                                max: 'Repeat count should not exceed 100'
                            }
                    },
                    sourceId: {
                        label: 'Training Source',
                        validation: { required: 'Source is required' },
                        dropdownLabel: 'Select Source'
                    }
                },
                buttons: {
                    create: 'Add Training'
                }
            }
        },
        lang: {
            en: { us: 'English (US)' },
            es: { mx: 'Spanish (Mexico)' }
        },
        location: {
            alarm: 'Alarm',
            noAlarm: 'No Alarm',
            bank1: 'Bank 1',
            bank2: 'Bank 2',
            center: 'Center',
            conference: 'Conference',
            cs: 'CS',
            csf: 'CSF',
            csr: 'CSR',
            curbside: 'Curbside',
            door: 'Door',
            doors: 'Over Doors',
            exterior: 'Exterior',
            floorWings: 'Floor Wings',
            front: 'Front',
            mid: 'Mid',
            midWall: 'Midwall',
            other: 'Other',
            porch: 'Porch',
            rear: 'Rear',
            ss: 'SS',
            ssf: 'SSF',
            ssr: 'SSR',
            streetside: 'Streetside',
            table: 'Table',
            underchassis: 'Underchassis',
            wings: 'Wings',
            workstation: 'Workstation'
        },
        logs: {
            name: 'Logs',
            headers: {
                source: 'Source',
                time: 'Time',
                date: 'Date',
                module: 'Module',
                target: 'Target',
                description: 'Description',
                level: 'Level'
            },
            buttons: {
                export: 'Export to CSV',
                filter: 'Add Filter'
            }
        },
        maintenance: {
            name: 'Maintenance'
        },
        menu: {
            analytics: 'Analytics',
            nodes: 'Command Nodes',
            dashboard: 'Dashboard',
            electrical: 'Electrical',
            environmental: 'Environmental',
            interlocks: 'Interlocks',
            logs: 'Logs',
            maintenance: 'Maintenance',
            mechanical: 'Mechanical',
            media: 'Media Library',
            networking: 'Networking',
            notifications: 'Notifications',
            settings: 'Settings',
            support: 'Support',
            user: 'User',
            users: 'Users',
            roles: 'Roles',
            wizards: 'Wizards',
            trainings: 'Trainings',
            profile: 'Profile',
            profileSettings: 'Profile Settings',
            darkMode: 'Dark Mode',
            language: 'Language',
            login: 'Login',
            logout: 'Logout',
            lastLogin: 'Last login',
            firstLoginMessage: 'First login',
            session: {
                timeout: 'Session Timeout',
                continue: 'Continue Session'
            },
            portal: {
                assets: 'Assets',
                alerts: 'Alerts',
                dashboards: {
                    allAssets: 'All Assets',
                    tcv1: '{{val, uppercase}}: $t(menu.dashboard)', // e,g TCV1: Dashboard
                    tcv2: '{{val, uppercase}}: $t(menu.dashboard)',
                    tcv3: '{{val, uppercase}}: $t(menu.dashboard)',
                    default: 'Dashboards',
                    onlineProjects: 'Online Projects',
                    offlineProjects: 'Offline Projects'
                },
                roleDashboards: 'Role Dashboards',
                groups: 'Groups',
                overview: '$t(menu.portal.assets) Overview',
                permissions: 'Permissions',
                roles: 'Roles',
                users: 'Users'
            }
        },
        misc: {
            compartment: 'Compartment',
            compartmentWithId: 'Compartment {{id}}',
            crane: 'Crane',
            dataRack: 'Data Rack',
            dataRackWithId: 'Data Rack {{id}}',
            door: 'Door',
            divider: 'Divider',
            equipmentLift: 'Equipment Lift',
            exterior: 'Exterior',
            fiber: 'Fiber',
            handrail: 'Handrail',
            ioDoor: 'I/O Door',
            ioBoxDoor: 'I/O Box Door',
            ioRoofBoxCover: 'I/O Roof Box Cover',
            ladder: 'Ladder',
            modular: 'Modular',
            monitor: 'Monitor',
            passthrough: 'Passthrough',
            red: 'Red',
            roofRail: 'Roof Rail',
            shelter: 'Shelter',
            shoreConnection: 'Shore Connection',
            stairs: 'Stairs',
            table: 'Table',
            tommyLift: 'Tommy Lift',
            travelLegDoor: 'Travel Leg Door',
            white: 'White',
            waterSensorLocation: 'Outside Wall Container',
            fireSensorLocation: 'Neverdown Battery Compartment'
        },
        modules: {
            alert: {
                precondition: {
                    label: 'Bypass Preconditions',
                    status: 'Met',
                    warning: 'Are you sure to bypass the status of preconditions of {{name}}?',
                    title: 'Alert - $t(modules.alert.precondition.label)'
                }
            },
            dashboard: {
                copy: 'Copy',
                edit: 'Edit',
                delete: 'Delete',
                share: 'Share',
                name: 'Dashboard',
                roles: 'Roles',
                active: 'Active Modules',
                modal: { confirm: { delete: { message: 'Are you sure you want to delete this item?' } } },
                button: { saveLayout: 'Save page layout' },
                empty: 'Add modules to your dashboard and they will show up here.'
            },
            apiKeyGen: {
                list: 'API Keys',
                name: 'API Key Generator',
                permissions: 'Permissions',
                read: 'Read',
                write: 'Write',
                execute: 'Execute',
                delete: 'Delete',
                merge: 'Merge',
                generateKey: 'Generate Key',
                creator: 'Creator',
                creationDate: 'Creation Date',
                grainedPermissions: 'Fined Grained Permissions',
                expireKey: 'Expire Key'
            },
            awning: {
                name: 'Awning',
                name_other: 'Awnings',
                command: {
                    retract: 'Retract',
                    extend: 'Extend'
                },
                status: {
                    retracted: 'Retracted',
                    extended: 'Extended',
                    extending: 'Extending',
                    retracting: 'Retracting'
                }
            },
            batteryMonitor: {
                name: 'Battery Monitor',
                name_other: 'Battery Monitor',
                units: {
                    amps: 'Amps',
                    volts: 'Volts'
                }
            },
            doorLock: {
                name: 'Security Controls',
                name_other: 'Security Controls',
                lockState: 'Lock State',
                locked: 'Locked',
                unlocked: 'Unlocked',
                locations: 'Location',
                on: 'On',
                off: 'Off',
                alarm: 'Alarm'
            },
            exterior: {
                name: 'Exterior Photo'
            },
            floor: {
                name: 'Floor',
                name_other: 'Floors',
                command: {
                    raise: 'Raise',
                    lower: 'Lower'
                },
                status: {
                    raising: 'Raising',
                    lowering: 'Lowering',
                    lowered: 'Lowered',
                    raised: 'Raised'
                }
            },
            generator: {
                name: 'Generator',
                name_other: 'Generators',
                command: {
                    start: 'Start',
                    stop: 'Stop'
                },
                status: {
                    running: 'Running',
                    stopped: 'Stopped',
                    starting: 'Starting',
                    stopping: 'Stopping'
                },
                primary: 'Primary',
                secondary: 'Secondary'
            },
            hvac: {
                name: 'HVAC',
                name_other: 'HVACs',
                nameWithId: 'Room {{id}}',
                fan: 'Fan',
                mode: 'Mode',
                temperature: 'Temperature',
                humidity: 'Humidity',
                status: {
                    environment: {
                        humidity: 'Current Humidity',
                        temperature: 'Current Temperature'
                    },
                    mode: {
                        auto: 'Auto',
                        heat: 'Heat',
                        cool: 'Cool',
                        off: 'Off'
                    },
                    fanSpeed: {
                        auto: 'Auto',
                        high: 'High',
                        medium: 'Medium',
                        low: 'Low',
                        off: 'Off'
                    }
                }
            },
            interlock: {
                name: 'Interlock',
                name_other: 'Interlocks',
                tableView: 'Table View',
                mapView: 'Map View',
                ssInterlock: 'Streetside Interlocks',
                csInterlock: 'Curbside Interlocks',
                tvInterlock: 'Interior Interlocks',
                status: {
                    metInterlocks: '',
                    unmetInterlocks: '{{numberNotMet}} '
                }
            },
            leveling: {
                name: 'Leveling',
                name_other: 'Leveling',
                command: {
                    extend: 'Extend',
                    retract: 'Retract'
                },
                status: {
                    retracted: 'Retracted',
                    extended: 'Extended',
                    extending: 'Extending',
                    retracting: 'Retracting'
                },
                level: ' Auto Level',
                leveled: 'Leveled',
                levelingLegs: 'Leveling Legs',
                on: 'On',
                off: 'Off'
            },
            light: {
                name: 'Light',
                name_other: 'Lights',
                allLights: 'All Lights',
                color: 'Color',
                globalControls: 'Global Controls',
                brightness: 'Brightness',
                state: 'Current State',
                groups: 'Location',
                on: 'On',
                off: 'Off',
                lights: 'Lights',
                variants: {
                    beacon: 'Beacon',
                    ground: 'Ground',
                    scene: 'Scene',
                    task: 'Task'
                },
                universePosition: '{{id}}',
                status: {
                    lightsOn: '{{totalOn}} / {{total}}',
                    lightsOff: '{{totalOff}} / {{total}}'
                }
            },
            lightTower: {
                name: 'Light Tower',
                name_other: 'Light Towers',
                command: {
                    deploy: 'Deploy',
                    stow: 'Stow'
                },
                controls: {
                    all: 'All Lights',
                    light: 'Light',
                    rotate: 'Rotate',
                    tilt: 'Tilt'
                },
                mastSectionTitle: 'Deploy & Rotate',
                lightingSectionTitle: 'Lighting',
                status: {
                    deployed: 'Deployed',
                    deploying: 'Deploying',
                    stowed: 'Stowed',
                    stowing: 'Stowing'
                }
            },
            map: {
                filter: { startDate: 'Start Date', endDate: 'End Date', search: 'Search' },
                layer: {
                    location: 'Live Locations',
                    route: 'Route Path'
                },
                type: {
                    assetTracking: 'Assets Tracker Map'
                }
            },
            mast: {
                name: 'Mast',
                name_other: 'Masts',
                command: {
                    deploy: 'Deploy',
                    stow: 'Stow'
                },
                status: {
                    deployed: 'Deployed',
                    stowed: 'Stowed',
                    deploying: 'Deploying',
                    stowing: 'Stowing'
                },
                height: 'Height: {{height}} ft'
            },
            mechanicalInformation: {
                name: 'Mechanical Information'
            },
            mediaLibrary: {
                name: 'Media Library',
                noFilesSelected: 'No Files Selected',
                noFilesInLibrary: 'There are no Files in the Library',
                size: 'Size',
                type: 'Type',
                download: 'Download',
                documents: 'Documents',
                searchDocuments: 'Search Documents',
                field: {
                    folderName: {
                        label: 'Enter Folder Name', validation: { required: 'Folder Name is required' }
                    }
                },
                dialog: {
                    addNewFolder: 'Add new Folder',
                    renameFolder: 'Rename Folder',
                    confirmDelete: 'Confirm Delete',
                    confirmDeleteMessage: 'Are you sure you want to delete this item?'
                },
                buttons: {
                    addFolder: 'Add Folder',
                    edit: 'Edit',
                    upload: 'Upload',
                    copy: 'Copy',
                    moveFile: 'Move File',
                    share: 'Share',
                    open: 'Open',
                    sort: 'Sorted By',
                    uploadFile: 'Upload File',
                    sendToPrinter: 'Send To Printer',
                    openSelected: 'Open Selected'
                }
            },
            missionStatus: {
                name: 'Mission Status',
            },
            multiStage: {
                name: 'MultiStage',
                command: {
                    deploy: 'Deploy',
                    stow: 'Stow'
                },
                status: {
                    deployed: 'Deployed',
                    stowed: 'Stowed',
                    deploying: 'Deploying',
                    stowing: 'Stowing'
                }
            },
            neverdown: {
                name: 'Neverdown',
                sources: {
                    shore: 'Shore Power',
                    generator: 'Generator',
                    auxGenerator: 'Aux Generator',
                    ptoGenerator: 'PTO Generator',
                    solar: 'Solar',
                    alternator: 'Alternator'
                },
                loads: {
                    alternating: 'AC Load',
                    direct: 'DC Load'
                },
                warnings: {
                    lowCharge: 'Low charge level detected',
                    lowTemperature: 'Temperature below operational threshold',
                    highTemperature: 'Temperature above safe operating level',
                    unableToCharge: 'Battery pack unable to charge'
                },
                errors: {
                    noResponse: 'No response from battery',
                    voltageDelta: 'Unsafe voltage delta between batteries or cells detected'
                },
                tableView: 'Table View',
                mapView: 'Map View',
                alternateCurrent: 'Alternate Current',
                directCurrent: 'Direct Current',
                battery: 'Battery',
                individualBatteries: 'Individual Batteries',
                cycles: 'Cycles',
                voltage: 'Voltage',
                current: 'Current',
                stateOfCharge: 'State of Charge',
                temperature: 'Temperature',
                cell: 'Cells',
                cellInformation: 'Cell Information',
                busBar: 'Bus Bar',
                charger: 'Charger',
                inverter: 'Inverter',
                converter: 'Converter',
                charging: 'Charging',
                discharging: 'Discharging'
            },
            outrigger: {
                name: 'Outrigger',
                name_other: 'Outrigger',
                command: {
                    extend: 'Extend',
                    retract: 'Retract'
                },
                status: {
                    retracted: 'Retracted',
                    extended: 'Extended',
                    extending: 'Extending',
                    retracting: 'Retracting'
                }
            },
            power: {
                name: 'Power',
                name_other: 'Power',
                details: 'Details',
                line: 'Line',
                sources: {
                    generator: 'Generator',
                    primary: 'Primary Sources',
                    secondary: 'Secondary Sources',
                    shore: 'Shore',
                    pto: 'PTO'
                },
                units: {
                    amps: 'Amps',
                    hertz: 'Hertz',
                    kilowatt: 'Kilowatt',
                    volts: 'Volts'
                }
            },
            powerDistribution: {
                name: 'Power Distribution',
                name_other: 'Power Distribution',
                watts: 'Watts',
                amps: 'Amps',
                powerFactor: 'Pwr Fct',
                unit: 'Unit {{number}}',
                outlet: 'Outlet {{identifier}}',
                status: {
                    outletsOn: '{{totalOn}} / {{total}}',
                    outletsOff: '{{totalOff}} / {{total}}'
                }
            },
            privacyGlass: {
                name: 'Privacy Glass',
                name_other: 'Privacy Glass',
                locations: 'Location',
                divider: 'Divider',
                room: 'Room {{id}}',
                state: 'State',
                lockState: 'Lock State',
                tinted: 'Tinted',
                clear: 'Clear',
                locked: 'Locked',
                unlocked: 'Unlocked',
                status: {
                    tinted: '{{totalTinted}} / {{total}}',
                    clear: '{{totalClear}} / {{total}}'
                }
            },
            rackControl: {
                name: 'Rack Control',
                name_other: 'Rack Controls',
                nameWithId: 'Rack {{id}}',
                command: {
                    on: 'On',
                    off: 'Off'
                },
                room: 'Room {{id}}',
                status: {
                    on: '{{rackName}}: On',
                    off: '{{rackName}}: Off',
                    starting: '{{rackName}}: Starting',
                    stopping: 'Stopping'
                },
                messages: {
                    warningMessage: 'All racks must be shut down before you can turn this rack on.',
                    warning: 'Warning',
                    messageOn: 'Turning on a rack requires that it goes through proper shutdown procedure. ' +
                        'Please check with a supervisor if you are unsure about operating this rack. ' +
                        'Are you sure you want to proceed?',
                    messageOff: 'Turning off a rack without following the proper shutdown procedure could cause data loss. ' +
                        'Please check with a supervisor if you are unsure about operating this rack. ' +
                        'Are you sure you want to proceed?',
                    exclusive: 'Turn off all other racks before this rack can be turned on.',
                    rackStatus: `Rack is currently: <b style="text-transform: uppercase">{{status}}</b>`,
                    toggle: `Turn {{command}}`
                }
            },
            rackTemperature: {
                name: 'Rack Monitor',
                name_other: 'Rack Monitors',
                nameWithId: 'Rack {{id}}',
                server: 'Server',
                intrusionAlert: 'Intrusion Alert',
                alertThreshold: 'Temp. Threshold'
            },
            sensor: {
                name: 'Advanced Sensor',
                name_other: 'Advanced Sensors',
                exterior: 'Exterior',
                roomHeader: {
                    room: 'Room',
                    location: 'Location',
                    sensor: 'Sensor',
                    currentReading: 'Current Reading',
                    alertThreshold: 'Alert Threshold',
                    alertStatus: 'Alert Status'
                },
                sensorHeader: {
                    sensorType: 'Sensor Type',
                    sensorLocation: 'Sensor Location',
                    currentReading: 'Current Reading',
                    alertThreshold: 'Alert Threshold',
                    alertStatus: 'Alert Status'
                },
                type: {
                    dust: 'Dust',
                    humidity: 'Humidity',
                    noise: 'Noise',
                    smoke: 'Smoke',
                    smokeAlert: 'Smoke Alert',
                    temperature: 'Temperature',
                    vibration: 'Vibration',
                    water: 'Water',
                    fire: 'Fire'
                },
                view: {
                    room: 'Room View',
                    sensor: 'Sensor View'
                }
            },
            shorePower: {
                name: 'Shore Power',
                name_other: 'Shore Power'
            },
            slideout: {
                name: 'Slideout',
                name_other: 'Slideouts',
                command: {
                    extend: 'Extend',
                    retract: 'Retract'
                },
                status: {
                    retracting: 'Retracting',
                    extending: 'Extending',
                    extended: 'Extended',
                    retracted: 'Retracted'
                }
            },
            sliderLabels: {
                manual: 'Manual',
                automatic: 'Automatic'
            },
            ups: {
                name: 'UPS',
                name_other: 'UPS',
                nameWithId: 'UPS {{id}}',
                command: {
                    start: 'Start',
                    stop: 'Stop'
                },
                status: {
                    on: 'On',
                    starting: 'Starting',
                    stopping: 'Stopping',
                    off: 'Off'
                },
                batteryPercent: 'Charge',
                runTime: 'Run Time',
                runTimeStatus: 'Run Time: {{runTime}} minutes',
                voltage: {
                    input: 'Input Voltage',
                    output: 'Output Voltage'
                }
            },
            vsat: {
                name: 'VSAT',
                name_other: 'VSATs',
                command: {
                    deploy: 'Deploy',
                    stow: 'Stow'
                },
                status: {
                    deployed: 'Deployed',
                    stowed: 'Stowed',
                    deploying: 'Deploying',
                    stowing: 'Stowing'
                }
            },
            weatherStation: {
                name: 'Weather Station',
                name_other: 'Weather Stations',
                barometricPressure: 'Barometric Pressure',
                dewPoint: 'Dew Point',
                humidity: 'Humidity',
                windDirection: 'Wind Direction',
                windSpeed: 'Wind Speed',
                temperature: 'Temperature'
            },
            analytics: {
                filter: { startDate: 'Start Date', endDate: 'End Date' }
            }
        },
        preconditions: {
            conferenceTable: {
                folded: 'Conference Table Folded'
            },
            door: {
                closed: 'Door Closed'
            },
            floor: {
                raised: 'Floor Raised',
                wings: {
                    folded: 'Floor Wings Folded'
                }
            },
            slideout: {
                extended: 'Slideout Extended'
            },
            misc: {
                systemActionPreconditionsMet: 'Preconditions for <b>{{action}}</b> met',
                systemActionPreconditionsNotMet: 'Preconditions for <b>{{action}}</b> not met',
                systemPreconditionsMet: 'Preconditions met',
                systemPreconditionsNotMet: 'Preconditions not met',
                moreInfo: 'More Info',
                title: 'Preconditions for ',
                expected: 'Expected'
            }
        },
        state: {
            closed: 'Closed',
            folded: 'Folded'
        },
        status: {
            celsius: '°C',
            decibel: 'db',
            degrees: '°',
            direction: {
                east: 'East',
                north: 'North',
                south: 'South',
                west: 'West'
            },
            fahrenheit: '°F',
            gravity: 'g',
            inHg: 'inHg',
            kph: 'KPH',
            mph: 'MPH',
            minutes: 'Minutes',
            percentage: '%',
            off: 'Off',
            on: 'On'
        },
        support: {
            name: 'Support'
        },
        wizard: {
            types: {
                filters: 'Filters',
                header: 'Wizard Types',
                name: 'Name',
                list: {
                    all: 'All',
                    deploy: 'Deploy',
                    stow: 'Stow',
                    maintenance: 'Maintenance'
                },
                buttons: {
                    add: 'Add'
                }
            },
            wizardControlNote: {
                stop: 'STOP',
                message: 'Refer to Wizard to control floor or slideout.'
            },
            steps: {
                step: 'Step',
                errorMessage: 'Step {{index}} has errors that need to be fixed before saving.',
                instructions: 'Instructions',
                summary: 'Wizard Summary',
                stepCompleted: 'Step Completed',
                safetyCheck: {
                    name: 'Safety Check',
                    message: 'Please confirm the safety check(s) before proceeding to the next step.'
                },
                safetyCheckRequired: 'Safety Check Required',
                buttons: {
                    saveStep: 'Save Step',
                    saveStepToolTipMessage: 'You must "save all" after deleting or reordering steps.',
                    saveAll: 'Save All',
                    next: 'Next',
                    back: 'Back',
                    skip: 'Skip this Step',
                    finish: 'Finish',
                    reset: 'Reset',
                    submit: 'Submit',
                    complete: 'Complete',
                    confirm: 'Confirm',
                    confirmed: 'Confirmed',
                    exit: 'Exit Wizard'
                },
                templateSteps: 'Template Steps',
                controlSystems: 'Control Systems'
            }
        }
    }
}
