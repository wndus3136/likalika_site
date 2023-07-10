/* 리덕스 관리 파일, 컴포넌트가 아님 (파일이름 변경해도 됨) */
import { configureStore, createSlice} from "@reduxjs/toolkit"

const user = createSlice({ //state 생성
    name: 'user',
    // initialState: '홍길동',
    initialState: {name: '러블리펫', memberYear: 1}, //단일데이터는 멤버변수(momberYear)가 없다 


    reducers: {
        // changeName() {
        //     return '이순신' 
        // }
        // changeName(state) { //값을 조작할 경우에는 (state)에 받아준다.
        //     return state + ' : Green'
        // }
        changeName(state) {
            state.name = state.name + ' : lovelyPet'
        }, //객체나 배열은 저장된 메모리 값을 가져오면 되는것이라 리턴이 필요없다.
        changeYear(state, action) {
            state.memberYear += action.payload
        } //payload 요청 메세지를 받는 것이다. 짝지처럼action.payloa 사용해야하고 action만 사용하면 안된다.
    } //reducers
}) // createSlice

export const {changeName, changeYear} =user.actions


//cart_state
const cart = createSlice({
    name: 'cart',
    initialState: [], //처음에는 비워져있음
    reducers: { 
        addItem(state, action) {
            //state.push(action.payload )
            const index = state.findIndex((findId) => { return findId.id === action.payload.id})/*  */
            if(index > -1) {/* 인덱스가 존재한다, -1보다 크지 않다면 존재하지 않는다  */
                state[index].count++
            } else{
                state.push(action.payload)
            }
        }, //addItem
        deleteItem(state, action) {
            const index = state.findIndex((findId) => {return findId.id === action.payload})
            state.splice(index, 1)
        }, //deleteItem

        addCount(state, action){
            const index = state.findIndex((findId)=>{return findId.id === action.payload})
            state[index].count++
          
        },
        subCount(state, action) {
            const index = state.findIndex((findId) => {return findId.id === action.payload})
            if(state[index].count > 1)state[index].count--
        }
    }
})

export const {addItem, addCount, subCount, deleteItem} = cart.actions


//전역적인 상태 관리를 위한 속성을 가지고있기 때문에 reducer를 사용 
export default configureStore({
    reducer: {
        user: user.reducer,
        cart: cart.reducer 
    }
})// 공식
//user는 내마음대로 정할 수 있음
//장바구니가 처음에는 state가없다가 클릭하면 추가된다.