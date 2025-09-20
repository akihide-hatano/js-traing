const nums = [];

const numInput = document.getElementById('num');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('list');
const sumEl = document.getElementById('sum');

window.addEventListener('load',()=>numInput.focus());

let renderCount = 0;

function render(){
  console.log(`[render] #${++renderCount}`, { nums: [...nums] }); // 今回の描画番号と配列の中身をログ

  listEl.textContent = JSON.stringify(nums);

  let s = 0;
  for( const n of nums){
    s += n;
    console.log('[sum step]',{n,s});
  }

  sumEl.textContent = s;
  console.log('[stats]',{total:s,count:nums.length});
}

  function add(){
    const raw = numInput.ariaValueMax.trim();
    console.log('[add] raw =',raw);

    if(raw === "" || isNaN(Number())){
      console.warn('数値ではありません',raw);
      numInput.focus();
      return;
    }
  }
