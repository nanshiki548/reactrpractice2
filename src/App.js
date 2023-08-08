import React, {useState, useEffect, memo, useCallback, useMemo,useRef} from "react";
import "./App.css"

//InputTextコンポーネントを定義
export const InputText = () => {
  //入力中のテキストの状態inputTextValueとinputTextValueの状態を更新する関数setInputeTextValue
  //inputTextValueの初期値は空の文字列
  //const [状態変数, 状態を変更するための関数] =useState(状態の初期値);
  const [InputTextValue, setInputTextValue] = useState("");

  //入力ボタンをclickした時のテキストの状態textとtextの状態を更新するsetText
  //textの初期値は"Javascript
  const [text, setText] = useState("Javascript");

  //onChangeでinputTextValueの状態(入力状態)を更新するイベントハンドラ
  const handleChange = (e) => setInputTextValue(e.target.value);

  //onClickでtextの状態かつinputTextValueの入力状態を空の文字列に更新するイベントハンドラ
  const handleClick = () => {
    setText(InputTextValue);
    setInputTextValue("");
  };
  return (
    <div className="App">
      {/*ボタンonClickでinputTextValueが更新されて画面上に表示が変化する */}
      <h1>I Love {text}!!</h1>

      {/*テキストが入力されるたびにonChangeイベントが走りinputtextValueが更新される */}
      <input type="text" value={InputTextValue} onChange={handleChange} />

      {/*入力ボタンclickでtextが更新される */}
      <input type="button" value="入力" onClick={handleClick} />
    </div>
  );
};

//セレクトボックス

export const InputeSelectBox = () => {
  const [selectedValue, setSelectedValue] = useState("HTML");

  //selectecValueの状態(どのオプションが選択されているかの状態)を更新するhandleChange関数を宣言
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div className="App">
      <p>
        {/*onChangeでselectdValueが混信されて画面上の表示が変化する */}
        現在選択されている値：
        <b>{selectedValue}</b>
      </p>

      {/*onChangeでselectedValueの状態がvalueの値に更新される */}
      <select size = "2" value={selectedValue} onChange={handleChange}>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="Javascript">Javascript</option>
      </select>
    </div>
  )
};


//ラジオボタン
export const InputRadio = () => {
  const [checkedRadioValue, setCheckedRadioValue] = useState("赤");

  const handleChange = (e) => setCheckedRadioValue(e.target.value);

  return (
    <div className="App">
      <p>
        {/*ラジオボタンonchangeでcheckedValueが更新されて画面上の表示が変する */}
        現在表示されている値：<b>{checkedRadioValue}</b>
      </p>
      <label>
        <input type="radio" 
        //onChangeでcheckedValueの状態が赤に更新される
        value="赤"
        //checkedValue ===　赤　がtureでcheckedになる
        onChange={handleChange}
        checked={checkedRadioValue === "赤"}
        />
      </label>
      <label>
        <input type="radio" 
        //onChangeでcheckedValueの状態が赤に更新される
        value="青"
        //checkedValue ===　赤　がtureでcheckedになる
        onChange={handleChange}
        checked={checkedRadioValue === "青"}
        />
      </label>
      <label>
        <input type="radio" 
        //onChangeでcheckedValueの状態が赤に更新される
        value="黄"
        //checkedValue ===　黄　がtureでcheckedになる
        onChange={handleChange}
        checked={checkedRadioValue === "黄"}
        />
      </label>
    </div>
  );
};

//チェックボックス
export const InputCheckBox = () => {
  const [checkdeValues, setCheckedValues] = useState([]);

  //どのチェックボックスがチェックされているかを更新する関数
  const handleChange = (e) => {
    if (checkdeValues.includes(e.target.value)) {
      //チェックした要素がcheckedCaluesに含まれていれば除外して、新たなcheckedValuesを作成して更新
      setCheckedValues(
        checkdeValues.filter((checkdeValues) => checkdeValues !== e.target.value)
      );
    } else {
      //checkedValuesにチェックした要素が含まれていなければ、チェックした要素を配列の末尾に追加し、checkedValueの状態を更新
      setCheckedValues([...checkdeValues, e.target.value]);
    }
  };
  return (
    <div className="App">
      <p>
        現在選択されている値：<b>{checkdeValues.join("、")}</b>
      </p>
      <label>
        <input type="checkbox" value="マウス" onChange={handleChange} 
          checked={checkdeValues.includes("マウス")}
        />
        マウス
      </label>
      <label>
        <input type="checkbox" value="モニター" onChange={handleChange} 
          checked={checkdeValues.includes("モニター")}
        />
        モニター
      </label>
      <label>
        <input type="checkbox" value="キーボード" onChange={handleChange} 
          checked={checkdeValues.includes("キーボード")}
        />
        キーボード
      </label>
    </div>
  );
};



//useStateの練習　(コンポーネントの状態の保持、動的に動かすには必須)
const INITIAL_COUNT = 0
const INITIAL_NAME = "Javascript"

export const SampleComponent = () => {
  const [count, setCount] = useState(INITIAL_COUNT);
  const [name, setName] = useState(INITIAL_NAME);

  const countIncrement = () => setCount((prevCount) => prevCount + 1);
  const countDecrement = () => setCount((prevCount) => prevCount - 1);
  const countReset = () => setCount(INITIAL_COUNT);

  const handleChangeName  = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <p>
        現在のカウント数:<b>{count}</b>
        <br />
        countの初期値:<b>{INITIAL_COUNT}</b>
      </p>
      <button onClick={countIncrement}>increment</button>
      <button onClick={countDecrement}>decrement</button>
      <button onClick={countReset}>Reset</button>
      <p>
        Hello, <b>{name}!!</b>
        <br />
      </p>
      <input type="text" onChange={handleChangeName} />
    </div>
  );
};


//useEffectの練習(UI構築後に行われる処理、処理のタイミングを指定できる)

export const SampleComponent1 = () => {
  const [count, setCount] = useState(INITIAL_COUNT);

  //副作用関数を宣言
  const callBackFunction = () => {
    document.title = `${count}回クリックされました`;
  }
  useEffect(callBackFunction, [count]);

  const countIncrement = () => {
    setCount((prevCount) => prevCount + 1)
  };
  const countReset = () => {
    setCount(INITIAL_COUNT)
  };

  return(
    <div className="App">
      <p>
        現在のカウント数:<b>{count}</b>
        <button onClick={countIncrement}>+1ボタン</button>
        <button onClick={countReset}>リセット</button>
      </p>
    </div>
  );
};

//useEffectの練習その２

//export const Timer = () => {
//  const [count, setCount] =useState(INITIAL_COUNT);
//
//  const countReset = () => {
//    setCount(INITIAL_COUNT);
//  };
//  
//  const countIncrement = () => {
//    setCount((prevCount) => prevCount + 1);
//    console.log('カウントアップ+1')
//  };
//
//  const callbackFunction = () => {
//    alert("副作用関数が実行されました！");
//    //1000ms毎にcountIncrement関数が実行されるtimer関数を宣言
//    const timer = setInterval(countIncrement, 1000);
//    return () => {
//      //コンポーネントのアンマウント時及び、副作用関数の再実行時に
//      console.log("timerが削除されました!");
//
//      clearInterval(timer);
//    };
//  }
//  //初回のみ副作用関数が実行
//  useEffect(callbackFunction, []);
//
//  return (
//    <div className="App">
//      <p>現在のカウント数:{count}</p>
//      <button onClick={countReset}リセット></button>
//    </div>
//  );
//};


//useCallback・ReactMemo・useMemo練習(不要な際レンダリングを防ぎパフォーマンス向上目的)

export const CountResult = memo(({text, countState}) => {
  //Counterコンポーネント(親)のボタンがクリックされてCounterコンポーネント(親)の持つcountStateが更新されたら
  //受け取っているCountResultコンポーネント(子)が再レンダリングされる
  console.log(`${text}ボタンがクリックされました!`);
  return (
    <div className="App">
    <p>
      {text}: {countState}
    </p>
    </div>
  );
});

export const Counter = () => {
  const [countStateA, setCountStateA] = useState(0);
  const [countStateB, setCountStateB] = useState(0);

  const countIncrementA = () => 
    setCountStateA((prevCount) => prevCount+1);
  const countIncrementB = () => 
  setCountStateB((prevCount) => prevCount+1);

  return (
    < div className="App">
    <CountResult text="Aボタン" countState={countStateA} />
    <CountResult text="Bボタン" countState={countStateB} />
    <button onClick={countIncrementA}>Aボタン</button>
    <button onClick={countIncrementB}>Bボタン</button>
    </div>
  );
};

//useCallbackとは関数自体をメモ化するフック(memoでコンポーネントをメモ化してもコールバック関数までが呼ばれると意味ない時に使う)
//useCallback()で親コンポーネントの関数をラップした例

//Buttonコンポーネント(子)countStateとbuttonValueをpropsとしてCounter(親)コンポーネントから受け取る

//子コンポーネントをReact.memoでラップ
export const Button = memo(({countState, buttonValue}) => {
  //ボタンがクリックされたて親コンポーネントのincrement関数が更新されたら子コンポーネントがレンダリングされる
  console.log(`${buttonValue}がクリックされました`);
  return <button onClick={countState}>{buttonValue}</button>;
});

//親コンポーネント
export const Counter2 = () => {
  const [countStateA, setCountStateA] = useState(0);
  const [countStateB, setCountStateB] = useState(0);

  //Aボタンのstateセット用countIncrementA関数
  const countIncrementA = useCallback(() => setCountStateA(countStateA +1), [countStateA]);
  //Bボタンのstateセット用countIncrementB関数
  const countIncrementB = useCallback(() => setCountStateB(countStateB +1), [countStateB]);

  return (
    <div className="App">
      <p>Aボタン{countStateA}</p>
      <p>Bボタン{countStateB}</p>
      <Button countState={countIncrementA} buttonValue="Aボタン" />
      <Button countState={countIncrementB} buttonValue="Bボタン" />
    </div>
  );
  };

//useMEMO練習

//正方形の面積を求めるsquare関数を宣言
const square = (params) => {
  const testData = [...Array(100).keys()];
  testData.forEach(() => {
    console.log(
      `「計算:B+1」がボタンクリックされ、square関数実行、ループ処理を${testData.length}回実行中...`
    );
  });
  return params*params;
};


export const Counter3 = () => {
  const [countStateA, setCountStateA] = useState(0);
  const [countStateB, setCountStateB] = useState(0);
  const CountResultA = () => {
    setCountStateA((prevCount) => prevCount+1);
    console.log("計算:A+1ボタンがクリックされました");
  };
  const CountResultB = () => {
    setCountStateB((prevCount) => prevCount+1);
    console.log("計算:B+1ボタンがクリックされました");
  };
  //正方形の面積をconstStateBを使って求めた計算結果
  //useMemoでラップして,計算結果をメモ化している
  const squareArea = useMemo(() => square(countStateB), [countStateB]);
  return (
    <div className="App">
      <p>
      計算結果A: {countStateA}
      <button onClick={CountResultA}>計算:A+1</button>
      </p>
      <p>
      計算結果B: {countStateB}
      <button onClick={CountResultB}>計算:B+1</button>
      </p>
      <p>【正方形の面積】</p>
      <p>計算結果B × 計算結果B = {squareArea}</p>
    </div>
  );
};


//useRefの練習
export const SampleComponent2 = () => {
  const inputRefOfject = useRef(null);
  const handleClick = () => {
    inputRefOfject.current.focus();
  };

  return (
    <div className="App">
      <input ref={inputRefOfject} type="text"/>
      <button onClick={handleClick}>入力エリアをフォーカス</button>
    </div>
  );
};
