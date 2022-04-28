export const TOGGLE_NAME = "PROFILE::TOGGLE_NAME";
export const CHECK_ME = "PROFILE::CHECK_ME";
export const UPDATE_NAME = "PROFILE::UPDATE_NAME";

export const changeVisible = {
	type: TOGGLE_NAME,
};

export const changeCheck = {
	type: CHECK_ME,
};

export const updateName = (userId, name) => ({
	type: UPDATE_NAME,
	userId,
	name,
});
