const components = []
const files = require.context('../../pages',true,/\.js$/);
files.keys().map( item => {
    if(item.includes("./Index/") || item.includes("./Login/")) {return false}
    const splitFilesName = item.split('.')
    const jsonObj = {}
    const path = `/index${splitFilesName[1].toLowerCase()}` // 路径
    const component = files(item).default // component
    jsonObj.path = path
    jsonObj.component = component
    components.push(jsonObj)
})
// console.log(components)
export default components