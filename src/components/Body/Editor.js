import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import axios from 'axios';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/board/board';

const ToastEditer = ({ board, handleOnChange, content }) => {
	const dispatch = useDispatch();
	const editorRef = useRef();

	const onChange = () => {
		const data = editorRef.current.getInstance().getHTML();
		dispatch(update({"id":"content", "value": data}));
	}
	const bucket = "imagestore-39fb6.appspot.com";

	useEffect(() => {
		const htmlString = content;
		editorRef.current.getInstance().setHTML(htmlString);
	}, [board]);

	return(
		<Editor
			toolbarItems={[
				['heading', 'bold', 'italic', 'strike'],
				['hr', 'quote'],
				['ul', 'ol', 'task', 'indent', 'outdent'],
				['table', 'image', 'link'],
				['code', 'codeblock'],
				['scrollSync'],
			]}
			initialValue=" "
			previewStyle="vertical"
			height="600px"
			initialEditType="wysiwg"
			hideModeSwitch={true}
			useCommandShortcut={false}
			language="ko-KR"
			ref={editorRef}
			onChange={onChange}
			hooks={{
				addImageBlobHook: async (file, callback) => {

					const formData = new FormData();
					formData.append('file', file);
					formData.append('fileName', file.name);

					axios.post(
						"http://localhost:8080/test/file",
						formData,
						{
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						}
					).then((res) => {
						let url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${res.data.url}?alt=media`;
						callback(url, 'img');
					}).catch((err) => {
						console.log(err);
					})
				}
			}}
		/>
	);

};

export default ToastEditer;


