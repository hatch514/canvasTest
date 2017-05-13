let cropping;
let requisite;
let save;
window.onload = () => {
  init();

  const canvas = document.getElementById('origin');
  ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = "img/lena.jpg";

  img.onload = () => {
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
    ctx.drawImage(img,0,0,img.width,img.height);
  };

  cropping = () => {
    const x1 = document.getElementsByName("x1")[0].value;
    const x2 = document.getElementsByName("x2")[0].value;
    const y1 = document.getElementsByName("y1")[0].value;
    const y2 = document.getElementsByName("y2")[0].value;
    
    try {
      document.getElementById('result').innerHTML = '<h3>result:</h3><canvas id="resCanvas"></canvas><br /><button onclick="save()">save</button>';
      const resCanvas = document.getElementById('resCanvas');
      const resCtx = resCanvas.getContext('2d');

      const resultImage = new Image();
      resultImage.src = "img/lena.jpg";

      resCanvas.setAttribute("height", x2-x1);
      resCanvas.setAttribute("width", y2-y1);

      resultImage.onload = () => {
        resCtx.drawImage(img,x1,y1,x2-x1,y2-y1,0,0,x2-x1,y2-y1);
      };

    } catch (e) { 
      alert("your input is wrong");
    }
  };

  requisite = () => {
    document.getElementsByName("x1")[0].value = 150;
    document.getElementsByName("x2")[0].value = 250;
    document.getElementsByName("y1")[0].value = 60;    
    document.getElementsByName("y2")[0].value = 180;     
  };

  save = () => {
    const resCanvas = document.getElementById('resCanvas');
    const resCtx = resCanvas.getContext('2d');

    resCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob); 
      const newImg = document.createElement('img'); // = new Image();

      newImg.onload = () => {
        URL.revokeObjectURL(blob);
      };
      newImg.src = url;
      const dlLink = document.createElement('a');
      dlLink.text = 'download'
      dlLink.id = 'download'
      dlLink.download = 'result.jpg';
      dlLink.href = url;
      document.body.appendChild(newImg); 
      document.body.appendChild(dlLink); 
    });
    
 
  };

};


