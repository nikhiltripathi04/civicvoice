exports.classifyComplaint = (text)=>{

 text = text.toLowerCase();

 if(text.includes("garbage"))
  return {category:"garbage", department:"Sanitation"};

 if(text.includes("pothole"))
  return {category:"road damage", department:"Road Department"};

 if(text.includes("streetlight"))
  return {category:"streetlight issue", department:"Electricity"};

 if(text.includes("water"))
  return {category:"water leakage", department:"Water Department"};

 return {category:"general", department:"Municipal Office"};

};