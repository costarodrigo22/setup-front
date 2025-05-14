import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "./lib/utils";
import { Loader2Icon, PackageOpenIcon, Trash2Icon } from "lucide-react";
import { Button } from "./components/ui/Button";
import { getPresignedURL } from "./service/getPresignedURL";
import { uploadFiles } from "./service/uploadFiles";

function App() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => prevState.concat(acceptedFiles));
    },
  });

  function handleRemoveFile(removingIndex: number) {
    setFiles((prevState) =>
      prevState.filter((_, index) => index !== removingIndex)
    );
  }

  async function handleUpload() {
    try {
      setIsLoading(true);

      const urls = await Promise.all(
        files.map(async (file) => ({
          url: await getPresignedURL(file.name),
          file,
        }))
      );

      await Promise.allSettled(
        urls.map(({ file, url }) => uploadFiles(url, file))
      );
    } catch {
      console.log("Deu zicaaaaa!!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center pt-20">
      <div className="w-full max-w-xl">
        <div
          {...getRootProps()}
          className={cn(
            "border h-60 w-full rounded-md border-dashed flex justify-center items-center flex-col cursor-pointer",
            isDragActive && "bg-accent/50 transition-colors"
          )}
        >
          <input {...getInputProps()} />

          <PackageOpenIcon className="size-10 stroke-1 mb-2" />

          <span>Solte seus arquivos aqui</span>

          <small className="text-muted-foreground">
            Apenas arquivos PNG de até 1MB
          </small>
        </div>

        {files.length > 0 && (
          <div className="mt-10">
            <h2 className="font-medium text-2xl tracking-tight">
              Arquivos selecionados
            </h2>

            <div className="mt-4 space-y-2">
              {files.map((file, index) => (
                <div
                  key={file.name}
                  className="border p-4 rounded-md flex items-center justify-between"
                >
                  <span className="text-sm">{file.name}</span>

                  <Button
                    variant="destructive"
                    size="icon"
                    className="cursor-pointer"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <Trash2Icon className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              className="mt-4 w-full cursor-pointer gap-1"
              disabled={isLoading}
              onClick={handleUpload}
            >
              {isLoading && <Loader2Icon className="size-4 animate-spin" />}
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
