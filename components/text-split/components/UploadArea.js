'use client';

import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Tooltip
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

export default function UploadArea({
  theme,
  files,
  uploading,
  uploadedFiles,
  onFileSelect,
  onRemoveFile,
  onUpload,
  selectedModel
}) {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        height: '100%',
        border: `2px dashed ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2,
        bgcolor: alpha(theme.palette.primary.main, 0.05),
        transition: 'all 0.3s ease',
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.main, 0.08),
          borderColor: alpha(theme.palette.primary.main, 0.3)
        }
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {t('textSplit.uploadNewDocument')}
      </Typography>

      <Tooltip
        title={!selectedModel?.id ? t('textSplit.selectModelFirst', { defaultValue: '请先在右上角选择模型' }) : ''}
      >
        <span>
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadFileIcon />}
            sx={{ mb: 2, mt: 2 }}
            disabled={!selectedModel?.id || uploading}
          >
            {t('textSplit.selectFile')}
            <input
              type="file"
              hidden
              accept=".md,.txt,.docx,.pdf"
              multiple
              onChange={onFileSelect}
              disabled={!selectedModel?.id || uploading}
            />
          </Button>
        </span>
      </Tooltip>

      <Typography variant="body2" color="textSecondary">
        {uploadedFiles.total > 0 ? t('textSplit.mutilFileMessage') : t('textSplit.supportedFormats')}
      </Typography>

      {files.length > 0 && (
        <Box sx={{ mt: 3, width: '100%' }}>
          <Typography variant="subtitle2" gutterBottom>
            {t('textSplit.selectedFiles', { count: files.length })}
          </Typography>

          <List sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1, maxHeight: '200px', overflow: 'auto' }}>
            {files.map((file, index) => (
              <Box key={index}>
                <ListItem
                  secondaryAction={
                    <Button
                      size="small"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => onRemoveFile(index)}
                      disabled={uploading}
                    >
                      {t('common.delete')}
                    </Button>
                  }
                >
                  <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(2)} KB`} />
                </ListItem>
                {index < files.length - 1 && <Divider />}
              </Box>
            ))}
          </List>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Tooltip
              title={
                !selectedModel?.id ? t('textSplit.selectModelFirst', { defaultValue: '请先在右上角选择模型' }) : ''
              }
            >
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onUpload}
                  disabled={uploading || !selectedModel?.id}
                  sx={{ minWidth: 120 }}
                >
                  {uploading ? <CircularProgress size={24} /> : t('textSplit.uploadAndProcess')}
                </Button>
              </span>
            </Tooltip>
          </Box>
        </Box>
      )}
    </Box>
  );
}
