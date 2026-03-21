import { Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/common/components/ui/Button/Button';
import { Modal } from '@/common/components/ui/Modal';
import { Pagination } from '@/common/components/ui/Pagination';
import { Skeleton } from '@/common/components/ui/Skeleton';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/common/components/ui/Table';
import { appRoutes } from '@/common/config/routes';
import { cn } from '@/common/lib/utils';

import { useAdminPosts } from '../../hooks/useAdminPosts';

export function AdminPostsTable() {
  const { posts, meta, paginationState, actions, searchState } = useAdminPosts();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      actions.deletePost(postToDelete);
      setDeleteModalOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <>
      <div className="w-full relative">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="w-32 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="transition-all duration-600 relative">
            {posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-base-content/50">
                  Nenhuma aula encontrada.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => {
                const isBeingDeleted = actions.isDeleting && actions.deletingId === post.id;
                return (
                  <TableRow
                    key={post.id}
                    className={cn(
                      'group cursor-pointer transition-all duration-600 ease-in-out',
                      isBeingDeleted ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100',
                    )}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{post.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{post.subject}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-base-content/80">{post.date}</span>
                    </TableCell>
                    <TableCell>
                      {/* Hover actions */}
                      <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="tooltip" data-tip="Ver">
                          <a
                            href={appRoutes.postDetail(post.id).path}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-ghost btn-xs btn-circle text-primary"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="tooltip" data-tip="Editar">
                          <Link
                            href={appRoutes.editPost(post.id).path}
                            className="btn btn-ghost btn-xs btn-circle text-base-content/60 hover:text-primary"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </div>
                        <div className="tooltip tooltip-error" data-tip="Deletar">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(post.id);
                            }}
                            className="btn btn-ghost btn-xs btn-circle text-base-content/60 hover:text-error"
                            disabled={isBeingDeleted}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {posts.length > 0 && !searchState.searchTerm && (
          <div className="flex justify-between items-center px-4 py-4 border-t border-base-200 bg-base-100">
            <div className="text-sm text-base-content/60">
              Mostrando {(meta.page - 1) * paginationState.limit + 1} de{' '}
              {Math.min(meta.page * paginationState.limit, meta.total)} de um total de {meta.total} aulas
            </div>
            <div>
              <Pagination currentPage={meta.page} totalPages={meta.lastPage} onPageChange={paginationState.setPage} />
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Deletar Aula"
        actions={
          <>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" className="btn-error text-white" onClick={confirmDelete}>
              Deletar
            </Button>
          </>
        }
      >
        <p>Tem certeza que deseja deletar esta aula? Esta ação não pode ser desfeita.</p>
      </Modal>
    </>
  );
}

export function AdminPostsTableSkeleton() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 px-4">
        <div className="flex gap-4 w-1/2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-6 w-24" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center py-4 px-4 border-b border-base-200">
          <div className="flex items-center gap-4 w-1/3">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>
      ))}
    </div>
  );
}
