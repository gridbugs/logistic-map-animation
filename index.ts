class Plot {
  readonly ctx: CanvasRenderingContext2D;
  readonly height: number;
  readonly width: number;

  constructor(element: HTMLCanvasElement) {
    this.height = element.height;
    this.width = element.width;
    this.ctx = element.getContext('2d');
  }

  dot(x: number, y: number) {
    const size = 0.5;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(x * this.width - size / 2, this.height - y * this.height - size / 2, size, size);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

window.onload = () => {
  const plot = new Plot(document.querySelector('#c'));
  const init = 0.5;
  let rateMin = 0;
  const rateMax = 4;

  const duration = 1000;
  let remaining = duration;

  function go() {
    for (let j = 0; j < 100; j ++) {
      const rate = (rateMax - rateMin) * Math.random() + rateMin;
      let x = init;
      for (let i = 0; i < 1000; i++) {
        x = rate * x * (1 - x);
      }
      for (let i = 0; i < 32; i++) {
        x = rate * x * (1 - x);
        plot.dot((rate - rateMin) / (rateMax - rateMin), x);
      }
    }
    remaining -= 1;
    if (remaining == 0) {
      plot.clear();
      rateMin = (rateMin + rateMax) / 2;
      remaining = duration;
    }
    requestAnimationFrame(go);
  }
  go();
}
