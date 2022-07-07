var express = require('express'),
    path = require('path'),
    app = express();
    app.set('port', (process.env.PORT || 8080));
    
    app.use(express.static('public'));

    const gdal = require('gdal-async');

    gdal.openAsync('public/lidarData/lidar-test-4.tif', async (e, dataset) => {
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
      // P1 = dataset.bands.get(1).pixels.get(1,1);
      // P2 = dataset.bands.get(1).pixels.get(100,200);
      // console.log(P1,P2)
      const band =await dataset.bands.getAsync(1);
      await band.computeStatisticsAsync(false)
      await gdal.translateAsync('public/output.png',dataset,['-b','1','-scale',`${band.minimum}`,`${band.maximum}`])
      const son = await gdal.drivers.get('DXF').createAsync('test.dxf',dataset.rasterSize.x,dataset.rasterSize.y,1);
      let layer = await son.layers.createAsync('contour')
      // let layer = await son.setMetadataAsync(await dataset.getMetadataAsync())
      await gdal.contourGenerateAsync({dst:layer,src:band,interval:2});
      son.close()
      let a = await gdal.openAsync('test.dxf')
      let contourData = await gdal.rasterizeAsync('outds.tif',a,['-l','entities','-a_nodata','-9999','-ts',`${dataset.rasterSize.x}`,`${dataset.rasterSize.y}`])
      const cband =await contourData.bands.getAsync(1);
      await cband.computeStatisticsAsync(false)
      // await outds.setMetadataAsync(dataset.getMetadata())
      // await gdal.rasterizeAsync(outds,son);
      await gdal.translateAsync('public/contour.png',contourData,['-b','1'])

      

});


app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});