import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  // Initialize state for the editor content
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="nylumime1ajwjzeufhtg323zgh2itpua3kp0qyh4idu3vih3" // Replace this with your actual API key from TinyMCE
            value={value} // Bind the editor content to state
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap", 
                "preview", "anchor", "searchreplace", "visualblocks", 
                "code", "fullscreen", "insertdatetime", "media", "table", 
                "help", "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={(content) => {
              setValue(content); // Update the local state on content change
              onChange(content); // Pass the updated content to react-hook-form's onChange
            }}
          />
        )}
      />
    </div>
  );
}
