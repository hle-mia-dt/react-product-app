import { alpha, Stack, Box } from "@mui/material";

interface TagProps {
  tags: string[];
}

const Tag = ({ children }: { children: JSX.Element | string }) => {
  return (
    <Box
      sx={{
        backgroundColor: alpha("#12B8FF", 0.15),
        paddingY: 0.5,
        paddingX: 1,
        textAlign: "center",
        color: "primary.main",
        fontSize: 12,
        borderRadius: "4px",
      }}
    >
      {children}
    </Box>
  );
};

const Tags = ({ tags }: TagProps) => {
  tags = tags || ["pending"];

  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
      {tags.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </Stack>
  );
};

export default Tags;
