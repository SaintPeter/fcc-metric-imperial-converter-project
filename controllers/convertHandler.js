/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  let re_units = /(?<=\d|^|\D)([a-z]{1,3})$/ig
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
    let re_div_splitter = /(?<=\d)\/(?=\d)/ig
    let re_non_digits = /[^\d.\/]/ig
    let re_number_check = /[^\d.]|\.{2,}/gi

    // get and remove units
    let noUnits = input.replace(re_units,'')

    // No number passed
    if(noUnits.length === 0) {
      return 1;
    }

    // After we remove the units, if there are
    // any non-number, period, or slash remaining
    // then we have an invalid number
    if(noUnits.match(re_non_digits)) {
      return null;
    }

    // Check for division
    // Valid division is a slash with a number
    // before and after
    let parts = noUnits.split(re_div_splitter);
    if(parts.length === 2) {
      if(parts[0].match(re_number_check) || parts[1].match(re_number_check)) {
        return null;
      }
      // Division Present
      try {
        let numerator = parseFloat(parts[0]);
        let denominator = parseFloat(parts[1]);

        // Catch divide by zero
        if(denominator === 0) {
          return null;
        }
        return numerator/denominator;
      } catch(e) {
        return null;
      }
    } else {
      if(noUnits.match(re_number_check)) {
        return null;
      }
      try {
        return parseFloat(noUnits)
      } catch(e) {
        return null;
      }
    }
  };
  
  this.getUnit = function(input) {
    let match = input.match(re_units);
    
    if(match) {
      let unit = match[0].toLowerCase();
      // No unit has length greater than 3
      if(unit.length > 3) {
        return null;
      }

      // If unit exists, return it
      if(units.hasOwnProperty(unit)) {
        return unit;
      }
    }

    // Fall-though is invalid unit
    return null;
  };
  
  this.getReturnUnit = function(initUnit) {
    return units[initUnit].convert_to;
  };

  this.spellOutUnit = function(unit) {
    return units[unit].name;
  };
  
  this.convert = function(initNum, initUnit) {
    // After converting, round to 5 digits
    return parseFloat(( initNum * units[initUnit].factor).toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${units[initUnit.toLowerCase()].name} ` +
           `converts to ${returnNum.toFixed(5)} ${units[returnUnit].name}`;
  };
  
}

module.exports = ConvertHandler;
