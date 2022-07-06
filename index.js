var express = require('express'),
    path = require('path'),
    app = express();
    app.set('port', (process.env.PORT || 8080));
    
    app.use(express.static('public'));

    const gdal = require('gdal-async');
// gdal.openAsync('public/lidar-retest.tif', (e, dataset) => {
//         if (e) {
//             console.error(e);
//             return;
//         }
//         dataset.bands.get(1).pixels.readAsync(0, 0, dataset.rasterSize.x,
//         dataset.rasterSize.y, (e, data) => {
//             if (e) {
//                 console.error(e);
//                 return;
//             }
//             console.log(data);
//         });
// });
const call  = async() =>{
  const ds = await gdal.openAsync('public/lidar-retest.tif')
  const output = await gdal.translateAsync('public/output.png',  ds, [ '-b', '1' ])
  await console.log(output)
}

call();
app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});