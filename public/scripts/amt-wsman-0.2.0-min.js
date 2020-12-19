var WsmanStackCreateService=function(e,s,r,a,o,t){var p={};function l(e){if(!e)return"";var s=" ";for(var r in e)e.hasOwnProperty(r)&&0===r.indexOf("@")&&(s+=r.substring(1)+'="'+e[r]+'" ');return s}function w(e){if(!e)return"";if("string"==typeof e)return e;if(e.InstanceID)return'<w:SelectorSet><w:Selector Name="InstanceID">'+e.InstanceID+"</w:Selector></w:SelectorSet>";var s="<w:SelectorSet>";for(var r in e)if(e.hasOwnProperty(r)){if(s+='<w:Selector Name="'+r+'">',e[r].ReferenceParameters){s+="<a:EndpointReference>",s+="<a:Address>"+e[r].Address+"</a:Address><a:ReferenceParameters><w:ResourceURI>"+e[r].ReferenceParameters.ResourceURI+"</w:ResourceURI><w:SelectorSet>";var a=e[r].ReferenceParameters.SelectorSet.Selector;if(Array.isArray(a))for(var o=0;o<a.length;o++)s+="<w:Selector"+l(a[o])+">"+a[o].Value+"</w:Selector>";else s+="<w:Selector"+l(a)+">"+a.Value+"</w:Selector>";s+="</w:SelectorSet></a:ReferenceParameters></a:EndpointReference>"}else s+=e[r];s+="</w:Selector>"}return s+="</w:SelectorSet>"}return p.NextMessageId=1,p.Address="/wsman",p.comm=CreateWsmanComm(e,s,r,a,o,t),p.PerformAjax=function(e,o,s,r,a){null==a&&(a=""),p.comm.PerformAjax('<?xml version=\"1.0\" encoding=\"utf-8\"?><Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:w="http://schemas.dmtf.org/wbem/wsman/1/wsman.xsd" xmlns="http://www.w3.org/2003/05/soap-envelope" '+a+"><Header><a:Action>"+e,function(e,s,r){if(200==s){var a=p.ParseWsman(e);a&&null!=a?o(p,a.Header.ResourceURI,a,200,r):o(p,null,{Header:{HttpError:s}},601,r)}else o(p,null,{Header:{HttpError:s}},s,r)},s,r)},p.CancelAllQueries=function(e){p.comm.CancelAllQueries(e)},p.GetNameFromUrl=function(e){var s=e.lastIndexOf("/");return-1==s?e:e.substring(s+1)},p.ExecSubscribe=function(e,s,r,a,o,t,n,l,d,m){var c="",i="";null!=d&&null!=m&&(c="<t:IssuedTokens><t:RequestSecurityTokenResponse><t:TokenType>http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#UsernameToken</t:TokenType><t:RequestedSecurityToken><se:UsernameToken><se:Username>"+d+'</se:Username><se:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd#PasswordText">'+m+"</se:Password></se:UsernameToken></t:RequestedSecurityToken></t:RequestSecurityTokenResponse></t:IssuedTokens>",i='<Auth Profile="http://schemas.xmlsoap.org/ws/2004/08/eventing/DeliveryModes/secprofile/http/digest"/>'),l=null!=l&&null!=l?"<a:ReferenceParameters>"+l+"</a:ReferenceParameters>":"";var u="http://schemas.xmlsoap.org/ws/2004/08/eventing/Subscribe</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo>"+w(n)+c+'</Header><Body><e:Subscribe><e:Delivery Mode="http://schemas.dmtf.org/wbem/wsman/1/wsman/'+s+'"><e:NotifyTo><a:Address>'+r+"</a:Address></e:NotifyTo>"+i+"</e:Delivery><e:Expires>PT0.000000S</e:Expires></e:Subscribe>";p.PerformAjax(u+"</Body></Envelope>",a,o,t,'xmlns:e="http://schemas.xmlsoap.org/ws/2004/08/eventing" xmlns:t="http://schemas.xmlsoap.org/ws/2005/02/trust" xmlns:se="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" xmlns:m="http://x.com"')},p.ExecUnSubscribe=function(e,s,r,a,o){var t="http://schemas.xmlsoap.org/ws/2004/08/eventing/Unsubscribe</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo>"+w(o)+"</Header><Body><e:Unsubscribe/>";p.PerformAjax(t+"</Body></Envelope>",s,r,a,'xmlns:e="http://schemas.xmlsoap.org/ws/2004/08/eventing"')},p.ExecPut=function(e,s,r,a,o,t){var n="http://schemas.xmlsoap.org/ws/2004/09/transfer/Put</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60.000S</w:OperationTimeout>"+w(t)+"</Header><Body>"+function(e,s){if(!e||null==s)return"";var r=p.GetNameFromUrl(e),a="<r:"+r+' xmlns:r="'+e+'">';for(var o in s)if(s.hasOwnProperty(o)&&0!==o.indexOf("__")&&0!==o.indexOf("@")&&void 0!==s[o]&&null!==s[o]&&"function"!=typeof s[o])if("object"==typeof s[o]&&s[o].ReferenceParameters){a+="<r:"+o+"><a:Address>"+s[o].Address+"</a:Address><a:ReferenceParameters><w:ResourceURI>"+s[o].ReferenceParameters.ResourceURI+"</w:ResourceURI><w:SelectorSet>";var t=s[o].ReferenceParameters.SelectorSet.Selector;if(Array.isArray(t))for(var n=0;n<t.length;n++)a+="<w:Selector"+l(t[n])+">"+t[n].Value+"</w:Selector>";else a+="<w:Selector"+l(t)+">"+t.Value+"</w:Selector>";a+="</w:SelectorSet></a:ReferenceParameters></r:"+o+">"}else if(Array.isArray(s[o]))for(n=0;n<s[o].length;n++)a+="<r:"+o+">"+s[o][n].toString()+"</r:"+o+">";else a+="<r:"+o+">"+s[o].toString()+"</r:"+o+">";return a+="</r:"+r+">"}(e,s);p.PerformAjax(n+"</Body></Envelope>",r,a,o)},p.ExecCreate=function(e,s,r,a,o,t){var n=p.GetNameFromUrl(e),l="http://schemas.xmlsoap.org/ws/2004/09/transfer/Create</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(t)+"</Header><Body><g:"+n+' xmlns:g="'+e+'">';for(var d in s)l+="<g:"+d+">"+s[d]+"</g:"+d+">";p.PerformAjax(l+"</g:"+n+"></Body></Envelope>",r,a,o)},p.ExecCreateXml=function(e,s,r,a,o){var t=p.GetNameFromUrl(e);p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/transfer/Create</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60.000S</w:OperationTimeout></Header><Body><r:"+t+' xmlns:r="'+e+'">'+s+"</r:"+t+"></Body></Envelope>",r,a,o)},p.ExecDelete=function(e,s,r,a,o){var t="http://schemas.xmlsoap.org/ws/2004/09/transfer/Delete</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(s)+"</Header><Body /></Envelope>";p.PerformAjax(t,r,a,o)},p.ExecGet=function(e,s,r,a){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/transfer/Get</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body /></Envelope>",s,r,a)},p.ExecMethod=function(e,s,r,a,o,t,n){var l="";for(var d in r)if(null!=r[d])if(Array.isArray(r[d]))for(var m in r[d])l+="<r:"+d+">"+r[d][m]+"</r:"+d+">";else l+="<r:"+d+">"+r[d]+"</r:"+d+">";p.ExecMethodXml(e,s,l,a,o,t,n)},p.ExecMethodXml=function(e,s,r,a,o,t,n){p.PerformAjax(e+"/"+s+"</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++"</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout>"+w(n)+"</Header><Body><r:"+s+'_INPUT xmlns:r="'+e+'">'+r+"</r:"+s+"_INPUT></Body></Envelope>",a,o,t)},p.ExecEnum=function(e,s,r,a){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/enumeration/Enumerate</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++'</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body><Enumerate xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration" /></Body></Envelope>',s,r,a)},p.ExecPull=function(e,s,r,a,o){p.PerformAjax("http://schemas.xmlsoap.org/ws/2004/09/enumeration/Pull</a:Action><a:To>"+p.Address+"</a:To><w:ResourceURI>"+e+"</w:ResourceURI><a:MessageID>"+p.NextMessageId+++'</a:MessageID><a:ReplyTo><a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><w:OperationTimeout>PT60S</w:OperationTimeout></Header><Body><Pull xmlns="http://schemas.xmlsoap.org/ws/2004/09/enumeration"><EnumerationContext>'+s+"</EnumerationContext><MaxElements>999</MaxElements><MaxCharacters>99999</MaxCharacters></Pull></Body></Envelope>",r,a,o)},p.ParseWsman=function(s){try{s.childNodes||(s=function(e){{if(window.DOMParser)return(new DOMParser).parseFromString(e,"text/xml");var s=new ActiveXObject("Microsoft.XMLDOM");return s.async=!1,s.loadXML(e),s}}(s));var e,r={Header:{}},a=s.getElementsByTagName("Header")[0];if(!(a=a||s.getElementsByTagName("a:Header")[0]))return null;for(var o=0;o<a.childNodes.length;o++){var t=a.childNodes[o];r.Header[t.localName]=t.textContent}var n=s.getElementsByTagName("Body")[0];if(!(n=n||s.getElementsByTagName("a:Body")[0]))return null;if(0<n.childNodes.length){var l=(e=n.childNodes[0].localName).indexOf("_OUTPUT");-1!=l&&l==e.length-7&&(e=e.substring(0,e.length-7)),r.Header.Method=e,r.Body=function e(s){var r,a={};for(var o=0;o<s.childNodes.length;o++){var t=s.childNodes[o];"true"==(r=0==t.childElementCount?t.textContent:e(t))&&(r=!0),"false"==r&&(r=!1);var n=r;if(0<t.attributes.length){n={Value:r};for(var l=0;l<t.attributes.length;l++)n["@"+t.attributes[l].name]=t.attributes[l].value}a[t.localName]instanceof Array?a[t.localName].push(n):null==a[t.localName]?a[t.localName]=n:a[t.localName]=[a[t.localName],n]}return a}(n.childNodes[0])}return r}catch(e){return console.log("Unable to parse XML: "+s),null}},p}