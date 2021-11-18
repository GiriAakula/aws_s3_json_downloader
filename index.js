var fs = require('fs');

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    console.log(filenames);
    filenames.forEach(function(filename) {
      fs.readFile(`${dirname}/${filename}`, 'utf-8', function(err, content) {
          console.log(err)
        if (err) {
        //   onError(err);

          return;
        }
        var obj = JSON.parse(content)
        obj.conf.bottomBanner = false;
        obj.conf.midrollErrorBannerFallback = false;
        obj.conf.prerollErrorFallback = false;
        obj.conf.enableSlideInPlugin = false;
        obj.conf.bannerOnPause = false;
        fs.writeFileSync(`./outputs/${filename}`, JSON.stringify(obj, null, 2));
        // onFileContent(filename, content);
      });
    });
  });
}

readFiles('/Users/vidgyor/Documents/jsons-download/inputs')