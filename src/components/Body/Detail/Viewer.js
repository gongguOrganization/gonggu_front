import { Viewer } from "@toast-ui/react-editor";

const ContentsViewer = ({ contents }) => {
	return <div><Viewer initialValue={contents || ''} /></div>
}

export default ContentsViewer;
