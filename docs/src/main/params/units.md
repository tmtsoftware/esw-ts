# Units

Listed below are Units of Measurement, supported by TMT observatory framework and are available as Enumerated values.
`Units` are optionally attached to `Parameter` Keys.

Type definition for Units can be found @extref[here](ts-docs:classes/models.Units.html)

@@@ note

The set of supported Units will be modified as more required Units will be discovered.

@@@

## Default Units for Keys

The default unit for `UTCTimeKey` and `TAITimeKey` is `second`. For all the remaining keys, default unit is NoUnits.

## SI Units

| Name        | Abbreviation | Description                                                                          |
| ----------- | ------------ | ------------------------------------------------------------------------------------ |
| angstrom    | Angstrom          | unit of length (10^-10 m) |
| alpha       | alpha             | fine structure constant      |
| ampere       | A                | unit of electrical current     |
| arcmin      | arcmin            | arc minute; angular measurement |
| arcsec      | arcsec            | arc second: angular measurement |
| bar         | bar               | unit of pressure      |
| candela     | candela           | unit of luminous intensity    |
| day         | d                 | day - 24 hours |
| degree      | deg               | degree: angular measurement 1/360 of full rotation |
| degC        | degC              | degree celsius    |
| degF        | degF              | Fahrenheit    |
| elvolt      | eV                | electron volt  |
| gauss       | gauss             | unit of measurement of magnetic induction  |
| gram        | g                 | unit of mass or weight |
| hertz       | Hz                | SI unit of frequency |
| henry       | henry             | unit of electrical inductance  |
| hour        | h                 | unit of time  |
| joule       | J                 | SI unit of energy |
| kelvin      | K                 | Kelvin: temperature with a null point at absolute zero |
| kilogram    | kg                | base unit of mass in SI |
| kilometer   | km                | unit of length equal to 1,000 metres |
| liter       | l                 | liter, metric unit of volume |
| lm          | lm                | unit of luminous flux, or amount of light  |
| lsun        | Lsun              | solar luminosity  |
| lx          | lx                | SI derived unit of illuminance measuring luminous flux per unit area   |
| meter       | m                 | meter: base unit of length in SI |
| mas         | mas               | milli arc second: angular measurement |
| me          | me                | electron mass - mass of a stationary electron |
| meter       | m                 | meter  |
| microarcsec | µas               | micro arc second; angular measurement |
| millimeter  | mm                | unit of length equal to 0.001 metre |
| millisecond | ms                | milliseconds |
| micron      | µm                | micron: alias for micrometer |
| micrometer  | µm                | micron |
| minute      | min               | minute |
| MJD         | MJD               | Modified Julian Date |
| mol         | mol               | mole: Unit of amount of substance |
| month       | month             | month |
| mmyy        | mmyy              | Month/Year |
| mu0         | mu0               | magnetic constant |
| muB         | muB               | moment of electrons is bohr magneton |
| nanometer   | nm                | nanometers |
| newton      | N                 | SI unit of force |
| ohm         | ohm               | unit of electric resistance |
| pascal      | Pa                | SI unit of pressure |
| pi          | pi                | pi is the ratio of the circumference of a circle to its diameter |
| pc          | pc                | unit for expressing distances to stars and galaxies |
| ppm         | ppm               | part per million |
| radian      | rad               | radian: angular measurement of the ratio between the length of an arc and its radius |
| second      | s                 | second: base unit of time in SI |
| sday        | sday              | sidereal day is the time of one rotation of the Earth |
| steradian   | sr                | steradian: unit of solid angle in SI  |
| volt        | V                 | Volt: electric potential or electromotive force |
| watt        | W                 | Watt: power |
| Wb          | Wb                | Weber: SI derived unit of magnetic flux |
| week        | wk                | week: 7 days   |
| year        | yr                | year  |

## CGS Units

| Name       | Abbreviation | Description              |
| ---------- | ------------ | ------------------------ |
| coulomb    | C                  | coulomb: electric charge |
| centimeter | cm                 | centimeter |
| D          | D                  | Debye(dipole) - electric dipole moments of molecules |
| dyn        | dyn                | CGS unit of force |
| erg        | erg                | CGS unit of energy |

## Astrophysical Units

| Name      | Abbreviation | Description                                                  |
| --------- | ------------ | ------------------------------------------------------------ |
| au         | AU                 | astronomical unit: approximately the mean Earth-Sun distance |
| a0         | a0                 | bohr radius |
| c          | c                  | speed of light |
| cKayser    | cKayser            | unit of wavenumber equal to reciprocal of a centimeter |
| crab       | crab               | unit for measurement of the intensity of Astrophysical X-ray sources |
| damas      | damas              | degree minute arcsecond |
| e          | e                  | electron charge |
| earth      | earth              | earth unit |
| F          | F                  | Farad: SI derived unit of electrical capacitance  |
| G          | G                  | Gravitation Constant gives the constant of proportionality |
| geoMass    | geoMass            | Earth Mass |
| hm         | hm                 | hour minute |
| hms        | hms                | hour minute seconds |
| hhmmss     | HH:MM:SS           | hour minutes seconds(sexagesimal time) |
| jansky     | Jy                 | Jansky: spectral flux density |
| jd         | jd                 | Julian Day at an instant is Julian day number plus the fraction of a day since the preceding noon in Universal Time | |
| jovMass    | jovMass            | Jupiter Mass |
| lightyear  | lyr                | light year  |
| mag        | mag                | stellar magnitude |
| mjup       | mjup               | Jupiter mass |
| mp         | mp                 | proton mass |
| minsec     | m:s                | minute second  |
| msun       | msun               | solar mass |
| photon     | photon             | photon |
| rgeo       | Rgeo               | Earth radius |
| rjup       | Rjup               | Jupiter radius |
| rsun       | Rsun               | solar radius |
| rydberg    | Rydberg            | ionization energy of hydrogen in its ground state (~13.6 eV) |
| seimens    | seimens            | derived unit of electric conductance |
| tesla      | tesla              | unit of magnetic induction |
| u          | u                  | atomic mass unit |

## Imperial Units

| Name  | Abbreviation | Description                                          |
| ----- | ------------ | ---------------------------------------------------- |
| barn       | barn               | unit of area for cross section of scattering (10^28 m^2) |
| cal        | cal                | thermochemical calorie: pre-SI metric unit of energy |
| foot       | ft                 | international foot |
| inch       | inch               | international inch |
| pound      | lb                 | international avoirdupois pound |
| mile       | mi                 | international mile |
| ounce      | oz                 | international avoirdupois ounce |
| yard       | yd                 | international yard |

## Others - Engineering

| Name    | Abbreviation | Description                          |
| ------- | ------------ | ------------------------------------ |
| NoUnits    | none               | scalar - no units specified |
| bit        | bit                | bit |
| encoder    | enc                | encoder counts |
| count      | ct                 | counts as for an encoder or detector |
| mmhg       | mmHg               | millimetre of  mercury |
| percent    | percent            | percentage |
| pix        | pix                | pixel |

## Time units

| Name | Abbreviation | Description   |
| ---- | ------------ | ------------- |
| tai      | tai                | TAI Time unit |
| utc      | utc                | UTC Time unit |
| date     | date               | date |
| datetime | datetime           | datetime |


## Usage Examples

Typescript
:   @@snip[units](../../../../example/src/documentation/params/UnitExample.ts) { #units }
