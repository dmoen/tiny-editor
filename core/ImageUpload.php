<?php

namespace Dmoen;

class ImageUpload{

  private $fieldName;

  private $uploadDir;

  private $maxFileSize;

  public function __construct($fieldName, $maxFileSize) {
    $this->fieldname = $fieldName;
    $this->uploadDir = dirname(__DIR__).'/uploads/'.date('Y-m-d');
    $this->maxFileSize = $maxFileSize; 
  }

  public function process() {
    $this->createDirs();
    $this->addImage();
  }

  private function createDirs() {
    if (!file_exists($this->uploadDir)) {
      mkdir($this->uploadDir, 0777, true);
    }
  }

  private function addImage() {
    $handle = new \upload($_FILES[$this->fieldname]);
    $handle->allowed = array('image/*');

    if(!in_array($handle->file_src_mime, ['image/gif', 'image/png', 'image/jpeg'])) {
      throw new \Exception('Invalid image', 400);
    }
    
    if($handle->file_src_size > $this->maxFileSize * 1024) {
      throw new \Exception('Invalid image size', 413);
    }    
    
    if ($handle->uploaded) {
      $handle->process($this->uploadDir);

      if ($handle->processed) {
        $handle->clean();
      }
    }
  }
}