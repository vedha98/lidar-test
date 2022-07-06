var express = require('express'),
    path = require('path'),
    app = express();
    app.set('port', (process.env.PORT || 8080));
    
    app.use(express.static('public'));

    const gdal = require('gdal-async');
gdal.openAsync('public/lidar-retest.tif', (e, dataset) => {
        if (e) {
            console.error(e);
            return;
        }
        // dataset.bands.get(1).pixels.readAsync(0, 0, dataset.rasterSize.x,
        // dataset.rasterSize.y, (e, data) => {
        //     if (e) {
        //         console.error(e);
        //         return;
        //     }
        //     console.log(data);
        // });
        P1 = dataset.bands.get(1).pixels.get(1,1);
        P2 = dataset.bands.get(1).pixels.get(100,200);
        console.log(P1,P2)
});
const call  = async() =>{
  const ds = await gdal.openAsync('public/lidarData/lidar-retest-2.tif')
  const band = ds.bands
  const output = await gdal.translateAsync('public/output.png',  ds, [ '-b', '1' ,'-scale','[70,90]'])
}

call();


app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});