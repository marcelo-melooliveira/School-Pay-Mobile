import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      
      case '@student/UPDATE_STUDENT_SUCCESS': {
        draft.profile = action.payload.profile;
        break;
      }
      default:
    }
  }); 
}