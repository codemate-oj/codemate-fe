/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useRequest } from "ahooks";
import { Button, Upload } from "antd";
import NextImage from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../ui/loading";
import { FallbackAvatarUrl } from "@/lib/avatar";

interface ImageUploaderProps {
  value?: string; // 图片url
  onChange?: (value: string) => void; // 表单change事件
  onUpload?: (file?: File) => Promise<string | null>; // 上传事件
  placeholderUrl?: string;
}

const RawImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />;

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onUpload,
  placeholderUrl = FallbackAvatarUrl,
}) => {
  const [pictureUrl, setPictureUrl] = useState<string>(value || placeholderUrl);
  const [isError, setIsError] = useState(false);

  const { run: handleUploadFile, loading } = useRequest(async (file?: File) => {
    if (!file || !onUpload) return;
    const res = await onUpload(file);
    if (res) {
      setPictureUrl(res);
    }
  });

  const ImageContainer = pictureUrl.startsWith("/") ? NextImage : RawImage;

  // 若给出value，则保持内部状态与外部同步的受控状态
  useEffect(() => {
    if (isError || !value || pictureUrl === value) return;
    setPictureUrl(value);
  }, [pictureUrl, value]);

  useEffect(() => {
    if (!onChange) return;
    onChange(pictureUrl);
  }, [onChange, pictureUrl]);

  return (
    <div className="flex gap-8">
      {loading ? (
        <div className="h-[160px] w-[160px]">
          <Loading />
        </div>
      ) : (
        <ImageContainer
          src={pictureUrl}
          alt="avatar"
          loading="lazy"
          className="h-[160px] w-[160px]"
          width={160}
          height={160}
          onError={() => {
            setIsError(true);
            setPictureUrl(placeholderUrl);
          }}
        />
      )}
      <Upload
        accept="image/png, image/jpeg"
        name="avatar"
        showUploadList={false}
        onChange={(info) => {
          handleUploadFile?.(info.file?.originFileObj);
        }}
      >
        <Button type="primary" loading={loading}>
          上传头像
        </Button>
      </Upload>
    </div>
  );
};

export default ImageUploader;
