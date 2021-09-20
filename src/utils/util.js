export function toggleTimelineCurrentClass(newItem) {
  const classes = document.getElementsByClassName("progress")
  for (let c of classes) {
    c.classList.remove("current");
  }
  document.getElementsByClassName(newItem)[0].classList.add("current");
}

export function delay(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}

export function removeExif(file) {
  return new Promise((resolve) => {
    let fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = () => {
      let dv = new DataView(fr.result);
      let offset = 0;
      let recess = 0;
      let pieces = [];
      let i = 0;
      if (dv.getUint16(offset) == 0xffd8) {
        offset += 2;
        let app1 = dv.getUint16(offset);
        offset += 2;
        while (offset < dv.byteLength) {
          if (app1 == 0xffe1) {
            pieces[i] = { recess: recess, offset: offset - 2 };
            recess = offset + dv.getUint16(offset);
            i++;
          } else if (app1 == 0xffda) {
            break;
          }
          offset += dv.getUint16(offset);
          let app1 = dv.getUint16(offset);
          offset += 2;
        }
        if (pieces.length > 0) {
          let newPieces = [];
          pieces.forEach(function (v) {
            newPieces.push(fr.result.slice(v.recess, v.offset));
          }, fr);
          newPieces.push(fr.result.slice(recess));
          let br = new Blob(newPieces, { type: "image/jpeg" });
          resolve(br);
        } else {
          resolve(file);
        }
      } else {
        // non JPG?
      }
    };
  });
}

export function getImageFileType(blob) {
  return new Promise(async (resolve) => {
    const arrayBuffer = await getArrayBuffer(blob);

    function getArrayBuffer(blob) {
      return new Promise((resolve) => {
        const fr = new FileReader();
        fr.readAsArrayBuffer(blob);
        fr.onload = () => resolve(fr.result);
      });
    }

    let ba = new Uint8Array(arrayBuffer);
    let headerStr = "";
    let headerHex = "";
    for (let i = 0; i < 10; i++) {
      headerHex += ba[i].toString(16);
      headerStr += String.fromCharCode(ba[i]);
    }
    let fileType = "unknown";
    if (headerHex.indexOf("ffd8") != -1) {
      fileType = "JPG";
    } else if (headerStr.indexOf("PNG") != -1) {
      fileType = "PNG";
    } else if (headerStr.indexOf("GIF") != -1) {
      fileType = "GIF";
    } else if (headerStr.indexOf("BM") != -1) {
      fileType = "BMP";
    }
    resolve(fileType);
  });
}


