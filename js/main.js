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

//バリデーション
function validationPositiveInteger(raw){
    //文字列と前後の余白削除
    const s = String(raw ?? '').trim();

    //空チェック
    if(s === ''){
      throw new Error("入力が空です");
    }else if(!/^\d+$/.test(s)){
      throw new Error("正の整数のみ入力してください");
    }else{
      const n = Number(s);
      if(!Number.isSafeInteger(n)){
        throw new Error("整数の範囲外です");
      } else if(n <= 0){
        throw new Error("0より大きい整数を入力してください");
      } else{
        return n;
      }
    }
    //形式チェック
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
    try{
      const n = validationPositiveInteger(numInput.value);
      nums.push(n);
      numInput.value = '';
      render();
      numInput.focus();
    }catch(e){
      showError(e.message || String(e));
      numInput.focus();
    }
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

  // ---- グローバルエラーも箱に出す（学習に便利）----
  window.addEventListener('error', (e) => showError(`実行時エラー: ${e.message}`));
  window.addEventListener('unhandledrejection', (e) => {
    const msg = e.reason?.message || String(e.reason);
    showError(`Promiseエラー: ${msg}`);
  });

  // 初期描画
  render();