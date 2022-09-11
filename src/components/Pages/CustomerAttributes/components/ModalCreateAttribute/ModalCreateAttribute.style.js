import { makeStyles } from "@mui/styles";

export const useModalCreateAttributeStyles = makeStyles((theme) => ({
	box: {
    width: '40%',
		backgroundColor : 'white',
		boxShadow : '24',
		padding : 25,
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
}));