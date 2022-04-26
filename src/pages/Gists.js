import { useCallback, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectGists, selectGistsError, selectGistsLoading } from "../store/gists/selectors";
import { getAllGists } from "../store/gists/action";

const Gists = () => {
	const dispatch = useDispatch();
	const gists = useSelector(selectGists);
	const loading = useSelector(selectGistsLoading);
	const error = useSelector(selectGistsError);

	const requestGists = async () => {
		dispatch(getAllGists());
	};

	useEffect(() => {
		requestGists();
	}, []);

	const renderGist = useCallback(
		(gist) => <li key={gist.id}>{gist.description || "No description"}</li>,
		[],
	);
	if (loading) {
		return <CircularProgress />;
	}
	if (error) {
		return (
			<div style={{ textAlign: "center" }}>
				<h4>Error</h4>
				<button onClick={requestGists}>Retry</button>
			</div>
		);
	}

	return (
		<div style={{ textAlign: "center" }}>
			<ul style={{ listStyleType: "none" }}>{gists.map(renderGist)}</ul>
		</div>
	);
};
export default Gists;
