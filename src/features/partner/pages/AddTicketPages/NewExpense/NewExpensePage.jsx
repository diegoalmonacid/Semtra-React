import { RequestForm } from '../../../components/RequestForm';
import { useEffect, useState } from 'react';
import { fetchCategories } from '../../../../../services/api';
import { CategorySelector } from '../../../components/categorySelector';
import { formAttributes, formularyTypes } from './formDefinitions';
import { ImageUpload } from '../../../components/ImageUpload';
import { DocProvider } from './DocProvider';
import { useSequencer } from '../../../../../components/specific/sequencer/context/SequencerContext';
import { updateExpense, fetchExpense, fetchRequestedDocs } from '../../../../../services/api';
import { FadeOutComponent } from './FadeOutComponent';

export const NewExpensePage = () => {
  const [categories, setCategories] = useState([]);
  const [formCategory, setFormCategory] = useState(0);
  const [formData, setFormData] = useState({});
  const { internalState, goToPrevStep } = useSequencer();
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [uploadedDocsFilesURL, setUploadedDocsFilesURL] = useState([]);
  const [requestedDocs, setRequestedDocs] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await updateExpense(internalState.expenseId, {...formData, categoryId: formCategory});
        
        goToPrevStep();
    }catch(error){
      console.error(error);
      setUploadStatus(`${error}`);
    }
  }

  const fetchInitialData = async () => {
    const result = await fetchCategories();
    if(result!=null){ 
      setCategories(result);
    }
    const [ expense ] = await fetchExpense(internalState.expenseId);
    setFormCategory(expense.categoryId ?? 0);
    setFormData(expense ?? {});
  }

  const fetchData = async () => {
    
    const [ expense ] = await fetchExpense(internalState.expenseId);
    const docs = expense.Docs;
    const localUploadedDocsFilesURL = docs.reduce((acc, doc) => ({...acc, [doc.docTypeId]: doc.name}),{});
    const uploadedDoctypeId = docs.map((doc) => doc.docTypeId);
    setUploadedDocsFilesURL(localUploadedDocsFilesURL);
    setUploadedDocs(uploadedDoctypeId);
    const requestedDocReponse = formCategory ? await fetchRequestedDocs(formCategory) : [];
    console.log(requestedDocReponse);
    setRequestedDocs(requestedDocReponse?.requestedDocs??[]);
  };
  useEffect(() => {
    fetchData();
  }, [formCategory]);
  useEffect(() => {
    fetchInitialData();
  }, []);

  const formCategoryName = categories.find((category) => category.categoryId === formCategory)?.name;
  const type = formularyTypes[formCategoryName] ?? null;
  const { fields } = type ? formAttributes[type] : { fields: []};
  //setUploadedDocs();
  return (
    <div className='flex-col w-full items-start h-full'>

        <CategorySelector className="flex-none grow-0 border-black w-[50%] pr-2" 
        categories={categories} formCategory={formCategory} setFormCategory={setFormCategory}
        fetchData={fetchData}/>

        <FadeOutComponent message={uploadStatus}/>

      <div className='flex flex flex-initial h-full w-full grow gap-4'>
        <DocProvider>

          <RequestForm fields={fields} formData={formData} setFormData={setFormData}
          uploadedDocs={uploadedDocs} requestedDocs={requestedDocs} handleSubmit={handleSubmit}/>

          <ImageUpload docRequested={requestedDocs} uploadedDocsFilesURL={uploadedDocsFilesURL} 
          setUploadStatus={setUploadStatus} fetchData={fetchData}/>

        </DocProvider>
      </div>
    </div>
  );
};




