# Subsystem

TMT Observatory system is composed of many subsystems. The subsystems that are known participants in the TMT Software System are predefined and the list is covered under the `Subsystem` enumeration.
They are identified using an abbreviation typically of 3 or 4 letters.

**Subsystem** values are used to construct **[Prefix](commands.html#Prefix)** and are used in communication vehicles such as Commands, Events and States.

Type definition for Subsystem can be found @extref[here](ts-docs:modules/models.html#Subsystem)

## List of Subsystems

| Abbreviation | Subsystem name                                                         |
| ------------ | ---------------------------------------------------------------------- |
| AOESW        | AO Executive Software                                                  |
| APS          | Alignment and Phasing System                                           |
| CIS          | Communications and Information Systems                                 |
| CLN          | Mirror Cleaning System                                                 |
| CRYO         | Cryogenic Cooling System                                               |
| CSW          | Common Software                                                        |
| DMS          | Data Management System                                                 |
| DPS          | Data Processing System                                                 |
| ESEN         | Engineering Sensor System                                              |
| ESW          | Executive Software System                                              |
| FMCS         | Facility Management Control System                                     |
| GMS          | Global Metrology System Controls                                       |
| IRIS         | InfraRed Imaging Spectrometer                                          |
| LGSF         | Laser Guide Star Facility                                              |
| M1CS         | M1 Control System                                                      |
| MODHIS       | Multi-Object Diffraction-limited High-resolution Infrared Spectrograph |
| NFIRAOS      | Narrow Field Infrared AO System                                        |
| NSCU         | NFIRAOS Science Calibration Unit                                       |
| OSS          | Observatory Safety System                                              |
| PFCS         | Prime Focus Camera Controls                                            |
| PSFR         | NFIRAOS AO PSF Reconstructor                                           |
| REFR         | Refrigeration Control System                                           |
| RTC          | NFIRAOS Real-time Controller                                           |
| RPG          | NFIRAOS AO Reconstructor Parameter Generator                           |
| SCMS         | Site Conditions Monitoring System                                      |
| SOSS         | Science Operations Support System                                      |
| TCS          | Telescope Control System                                               |
| WFOS         | Wide Field Optical Spectrometer                                        |
| Container    | Container subsystem                                                    |

## Usage Examples

The usage examples can be found in [Events](../services/event-service.html), [Commands](commands.html), [States](./state-variables.html)
