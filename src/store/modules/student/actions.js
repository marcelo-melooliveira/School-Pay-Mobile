export function updateStudentRequest(data) {
  return {
    type: '@student/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateStudentSuccess(profile) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { profile },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_PROFILE_FAILURE',
  };
} 