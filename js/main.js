const nums= [];

const numInput = document.getElementById('num');
const addBtn = document.getElementById('addBtn');
const listEl = document.getElementById('list');
const sumEl = document.getElementById('sum');
const undoBtn = document.getElementById('undoBtn');
const clearBtn = document.getElementById('clearBtn');
const countEl = document.getElementById('count');
const avgEl = document.getElementById('avg');
const errorBox = document.getElementById('errorBox');

window.addEventListener('load',()=>numInput.focus());

//エラー表示(2秒で自動で消える)
function showError(msg){
    console.error('[error]',msg);
    errorBox.textContent = msg;
    errorBox.classList.remove('hidden');
    setTimeout(()=>errorBox.classList.add('hidden'),2000);
}

  let renderCount = 0;

  function render(){
    console.log(`[render] #${++renderCount}`,{nums:[...nums]});

    listEl.textContent = JSON.stringify(nums);

    let s =0;
    for(const n of nums){
      s += n;
      console.log('[sum step]',{n,s});
    }
    sumEl.textContent = s;

    // render() の末尾、sumEl.textContent = s のすぐ後に追記
    countEl.textContent = nums.length;
    avgEl.textContent   = nums.length ? (s / nums.length).toFixed(2) : '0.00';
    console.log('[stats]',{total:s,count:nums.length});
  }

  function add(){
    const raw = numInput.value.trim();
    console.log('[add] raw',raw);

    // if(raw === "" || isNaN(Number(raw))){
    //   console.warn('数値ではありません',raw);
    //   numInput.focus();
    //   return;
    // }
    if (raw === "" || isNaN(Number(raw))) {
      console.warn('数値ではありません', raw);
      numInput.style.background = '#8a2525ff';
      setTimeout(() => (numInput.style.background = ''), 200);
      numInput.focus();
      return;
  }
    nums.push(Number(raw));
    numInput.value = '';
    render();
    numInput.focus();
  }

  addBtn.addEventListener('click',add);

  numInput.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter'){
      add();
    }
  });

  undoBtn.addEventListener('click',()=>{
    nums.pop();
    render();
  });

  clearBtn.addEventListener('click',()=>{
    nums.splice(0);
    render();
  });