// import { resetGameOver, resetQuestion, resetQuestionCount } from "../Slices/questionSlice";
import { resetLevel, resetGameOver, resetQuestion } from "../Slices/questionSlice";
import { resetDrawSpin, resetModalRedeem } from "../Slices/redeemModalSlice";
import { resetTimer } from "../Slices/timeSlice";

export function ResetStore(dispatch){
    // dispatch(resetQuestionCount());
    dispatch(resetTimer());
    dispatch(resetLevel());
    dispatch(resetGameOver());
    dispatch(resetModalRedeem());
    dispatch(resetDrawSpin());
}