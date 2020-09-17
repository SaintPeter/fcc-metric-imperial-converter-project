/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  let re_num_splitter = /(?<=\d)(?=[a-z])/ig
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  const units = {
    'gal': {
      convert_to: 'l',
      factor: galToL,
      name: 'gallons'
    },
    'l': {
      convert_to: 'gal',
      factor: 1/galToL,
      name: 'liters'
    },
    'mi': {
      convert_to: 'km',
      factor: miToKm,
      name: 'miles'
    },
    'km': {
      convert_to: 'mi',
      factor: 1/miToKm,
      name: 'kilometers'
    },
    'lbs': {
      convert_to: 'kg',
      factor: lbsToKg,
      name: 'pounds'
    },
    'kg': {
      convert_to: 'lbs',
      factor: 1/lbsToKg,
      name: 'kilograms'
    }};

  this.getNum = function(input) {
    let result;

    // Check for division
    let parts = input.split(re_num_splitter);
    if(parts.length === 2) {
      if(parts[0].match(/\//)) {
        let fraction_parts = parts[0].split(/\//);
        // Check for double fractions
        if(fraction_parts.length > 2) {
          return null;
        }
        let numerator = parseFloat(fraction_parts[0]);
        let denominator = parseFloat(fraction_parts[1]);

        // Catch divide by zero
        if(denominator === 0) {
          return null;
        }
        return numerator/denominator;
      } else {
        // No fractions
        return parseFloat(parts[0])
      }
    }

    // Can't find a part number split
    return 1;
  };
  
  this.getUnit = function(input) {
    let match = input.match(/[a-z]+$/gi);
    
    if(match) {
      let unit = match[0];
      // No unit has length greater than 3
      if(unit.length > 3) {
        return null;
      }

      // If unit exists, return it
      if(units.hasOwnProperty(unit.toLowerCase())) {
        return unit;
      }
    }

    // Fall-though is invalid unit
    return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    return units[initUnit.toLowerCase()].convert_to;
  };

  this.spellOutUnit = function(unit) {
    return units[unit.toLowerCase()].name;
  };
  
  this.convert = function(initNum, initUnit) {
    return initNum * units[initUnit.toLowerCase()].factor;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    
    return `${initNum} ${units[initUnit.toLowerCase()].name} converts to ${returnNum.toFixed(5)} ${units[returnUnit].name}`;
  };
  
}

module.exports = ConvertHandler;
