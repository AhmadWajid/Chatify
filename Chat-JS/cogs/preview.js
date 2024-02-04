// const { linkPreview } = require(`link-preview-node`);


// async function youtube(test) {
//   var link_embed = test.link.replace('watch?v=', 'embed/');
//   var another = `<div class="msg-text"><a href="${test.link}">${test.title}</a> <br><iframe width="420" height="315" src="${link_embed}"> </iframe></div>`
//   return another
// }

// async function preview(msg) {
//   var test = await linkPreview(msg)
//   if (test.link.includes('youtube.com/watch')) {
//     test = await youtube(test)
//   } else {
//     console.log(test)
//   }
//   return test
// }
// module.exports = {preview}