export const TOGGLE_NAME = "TOGGLE_NAME";
export const CHECK_ME = "CHECK_ME";
export const UPDATE_NAME = "UPDATE_NAME";

export const changeVisible = {
	type: TOGGLE_NAME,
};

export const changeCheck = {
	type: CHECK_ME,
};

export const updateName = (name) => ({
	type: UPDATE_NAME,
	payload: name,
});
